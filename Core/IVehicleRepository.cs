using System.Collections.Generic;
using System.Threading.Tasks;
using erinzuun.Core.Models;

namespace erinzuun.Core
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicle(int id, bool includeRelated);
        void Add(Vehicle vehicle);
        void Remove(Vehicle vehicle);
        Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery filter);
    }
}