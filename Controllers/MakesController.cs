using AutoMapper;
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
    [Route("/api/makes")]
    public class MakesController : Controller
    {
        private readonly ErinDbContext ctx;
        private readonly IMapper mapper;

        public MakesController(ErinDbContext ctx, IMapper mapper)
        {
            this.ctx = ctx;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<MakeResource>> GetMakes()
        {
            var makes = await ctx.Makes.Include(m => m.Models).ToListAsync();

            return mapper.Map<IEnumerable<Make>, IEnumerable<MakeResource>>(makes);

        }
    }
}
