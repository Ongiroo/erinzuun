using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using erinzuun.Controllers.Resources;
using erinzuun.Core.Models;
using erinzuun.Persistence;

namespace erinzuun.Controllers
{
    [Route("/api/features")]
    public class FeaturesController : Controller
    {
        private readonly ErinDbContext ctx;
        private readonly IMapper mapper;

        public FeaturesController(ErinDbContext ctx, IMapper mapper)
        {
            this.ctx = ctx;
            this.mapper = mapper;
        }

        
        public async Task<IEnumerable<KeyValuePairResource>> GetFeaturesAsync()
        {
            var feature = await ctx.Features.ToListAsync();

            return mapper.Map<IEnumerable<Feature>, IEnumerable<KeyValuePairResource>>(feature);
        }
    }
}
