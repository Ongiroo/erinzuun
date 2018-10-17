using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using erinzuun.Controllers.Resources;
using erinzuun.Core;
using erinzuun.Core.Models;


namespace erinzuun.Controllers
{
    [Route("/api/vehicles")]
    public class VehiclesController : Controller
    {
        
        private readonly IMapper mapper;
        private readonly IVehicleRepository vehicleRepository;
        private readonly IUnitOfWork unitOfWork;

        public VehiclesController(IMapper mapper, IVehicleRepository vehicleRepository, IUnitOfWork unitOfWork)
        {
            
            this.mapper = mapper;
            this.vehicleRepository = vehicleRepository;
            this.unitOfWork = unitOfWork;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateVehicle([FromBody]SaveVehicleResource vehicleResource)
        {
            
            try
            {
                //throw new Exception();
                if (ModelState.IsValid)
                {
                    var vehicle = mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource);

                    vehicle.LastUpdate = DateTime.Now;

                    vehicleRepository.Add(vehicle);
                    await unitOfWork.CompleteAsync();

                    vehicle = await vehicleRepository.GetVehicle(vehicle.Id, true);

                    var result = mapper.Map<Vehicle, VehicleResource>(vehicle);

                    return Ok(result);
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                //ModelState.AddModelError($"error while creating Vehicle : { ex }", ex);
                return BadRequest($"error while creating Vehicle : { ex }");
            }

        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody]SaveVehicleResource vehicleResource)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    //var vehicle = await ctx.Vehicles.Include(vf => vf.Features).SingleOrDefaultAsync(v=>v.Id==id);

                    var vehicle = await vehicleRepository.GetVehicle(id, true);

                    if (vehicle != null)
                    {
                        mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource, vehicle);
                        vehicle.LastUpdate = DateTime.Now;

                        await unitOfWork.CompleteAsync();

                        vehicle = await vehicleRepository.GetVehicle(vehicle.Id, true);
                        var result = mapper.Map<Vehicle, VehicleResource>(vehicle);
                        return Ok(result);
                    }
                    else
                    {
                        return NotFound("Vehicle not found");
                    }
                }
                else
                    return BadRequest(ModelState);

            }
            catch (Exception ex)
            {

                return BadRequest($"error while updating Vehicle : { ex }");
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await vehicleRepository.GetVehicle(id, false);
            if (vehicle != null)
            {
                vehicleRepository.Remove(vehicle);

                await unitOfWork.CompleteAsync();
                return Ok(id);
            }
            else
            {
                return NotFound("Vehicle not Found");
            }
        }
         
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            var vehicle = await vehicleRepository.GetVehicle(id, true);
            if (vehicle == null)
                return NotFound("Vehicle not found");

            return Ok(mapper.Map<Vehicle, VehicleResource>(vehicle));
        }

        [HttpGet]
        public async Task<QueryResultResource<VehicleResource>> GetVehicles(VehicleQueryResource filterRersource)
        {
            var filter = mapper.Map<VehicleQueryResource, VehicleQuery>(filterRersource);

            var queryResult = await vehicleRepository.GetVehicles(filter);

            return mapper.Map<QueryResult<Vehicle>, QueryResultResource<VehicleResource>>(queryResult);
        }

    }
}
