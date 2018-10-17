using erinzuun.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using erinzuun.Core;

namespace erinzuun.Persistence
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly ErinDbContext ctx;

        public PhotoRepository(ErinDbContext ctx)
        {
            this.ctx = ctx;
        }
        public async Task<IEnumerable<Photo>> GetPhotos(int vehicleId)
        {
            return await ctx.Photos
                .Where(p => p.VehicleId == vehicleId)
                .ToListAsync();
        }
    }
}
