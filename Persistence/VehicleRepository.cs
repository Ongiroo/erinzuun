using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using erinzuun.Core;
using erinzuun.Core.Models;
using erinzuun.Extensions;

namespace erinzuun.Persistence
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly ErinDbContext ctx;

        public VehicleRepository(ErinDbContext ctx)
        {
            this.ctx = ctx;
        }

        public async Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery queryObj)
        {
            var result = new QueryResult<Vehicle>();

            var query = ctx.Vehicles
                                .Include(m => m.Model)
                                    .ThenInclude(m => m.Make)
                                    .AsQueryable();

            query = query.ApplyFiletering(queryObj);



            var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>()
            {
                ["make"] = v => v.Model.Make.Name,
                ["model"] = v => v.Model.Name,
                ["contactName"] = v => v.ContactName
            };

            //query = ApplyOrdering(queryObj, query, columnsMap);

            query = query.ApplyOrdering(queryObj, columnsMap);

            result.TotalItems = await query.CountAsync();
            query = query.ApplyPaging(queryObj);

            result.Items = await query.ToListAsync();
            return result;
        }


        //private IQueryable<Vehicle> ApplyOrdering(VehicleQuery queryObj, IQueryable<Vehicle> query, Dictionary<string, Expression<Func<Vehicle, object>>> columnsMap)
        //{
        //    if (queryObj.IsShortAscending)
        //        return query = query.OrderBy(columnsMap[queryObj.SortBy]);
        //    else
        //        return query = query.OrderByDescending(columnsMap[queryObj.SortBy]);

        //}

        public async Task<Vehicle> GetVehicle(int id, bool includeRelated)
        {
            if (includeRelated)
                return await ctx.Vehicles
                                .Include(f => f.Features)
                                    .ThenInclude(vf => vf.Feature)
                                .Include(m => m.Model)
                                    .ThenInclude(m => m.Make)
                                .SingleOrDefaultAsync(v => v.Id == id);
            else
                return await ctx.Vehicles
                                .SingleOrDefaultAsync(v => v.Id == id);

        }

        public void Add(Vehicle vehicle)
        {
            ctx.Vehicles.Add(vehicle);
        }

        public void Remove(Vehicle vehicle)
        {
            ctx.Vehicles.Remove(vehicle);
        }
    }
}
