using System.Threading.Tasks;
using erinzuun.Core;

namespace erinzuun.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ErinDbContext ctx;

        public UnitOfWork(ErinDbContext ctx)
        {
            this.ctx = ctx;
        }
        public async Task CompleteAsync()
        {
            await ctx.SaveChangesAsync();
        }
    }
}
