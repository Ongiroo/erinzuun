using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using erinzuun.Controllers.Resources;
using erinzuun.Core;
using erinzuun.Core.Models;
using erinzuun.Persistence;

namespace erinzuun.Controllers
{
    [Route("/api/vehicles/{vehicleId}/photos")]
    public class PhotosController : Controller
    {
        //private readonly int MAX_BYTES = 10 * 1024 * 1024;
        //private readonly string[] ACCEPTED_FILE_TYPE = new[] {".jpg", ".png",".jpeg" };

        private readonly IHostingEnvironment host;
        private readonly IVehicleRepository vehicleRepository;
        
        private readonly IMapper mapper;
        private readonly IPhotoRepository photoRepository;
        private readonly IPhotoService photoService;
        private readonly PhotoSettings photoSettings;

        public PhotosController(IHostingEnvironment host, IVehicleRepository vehicleRepository,  IMapper mapper, IOptionsSnapshot<PhotoSettings> options, IPhotoRepository photoRepository, IPhotoService photoService)
        {
            this.photoSettings = options.Value;
            this.host = host;
            this.vehicleRepository = vehicleRepository;
          
            this.mapper = mapper;
            this.photoRepository = photoRepository;
            this.photoService = photoService;
        }

        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
        {
            var vehicle = await vehicleRepository.GetVehicle(vehicleId, false);
            if (vehicle == null)
                return NotFound("Vehicle not Found");

            if (file == null)
                return BadRequest("Null File");
            if (file.Length == 0)
                return BadRequest("Empty file");

            if (file.Length > photoSettings.MaxBytes)
                return BadRequest("File size upto 10 MB is allowed.");

            if (!photoSettings.IsSupported(file.FileName))
                return BadRequest("Invalid File Type");

            var uploadsFolderPath = Path.Combine(host.WebRootPath, "uploads");
            

            var photo = await photoService.UploadPhoto(vehicle, file, uploadsFolderPath);

            return Ok(mapper.Map<Photo, PhotoResource>(photo));
        }


        public async Task<IEnumerable<PhotoResource>> GetPhotos(int vehicleId)
        {
            var photos = await photoRepository.GetPhotos(vehicleId);

            return mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoResource>>(photos);
        }

    }
}
