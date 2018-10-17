using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;
using erinzuun.Core.Models;

namespace erinzuun.Core
{
    public class PhotoService : IPhotoService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IPhotoStorage photoStorage;

        public PhotoService(IUnitOfWork unitOfWork, IPhotoStorage photoStorage)
        {
            this.unitOfWork = unitOfWork;
            this.photoStorage = photoStorage;
        }

        public async Task<Photo> UploadPhoto(Vehicle vehicle, IFormFile file, string uploadsFolderPath)
        {

            
            var fileName = await photoStorage.StorePhoto(uploadsFolderPath, file);

            var photo = new Photo { FileName = fileName };
            vehicle.Photos.Add(photo);

            await unitOfWork.CompleteAsync();

            return photo;
        }

        
    }
}
