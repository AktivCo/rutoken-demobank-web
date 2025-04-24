using DemoPortalInternetBank.Domain;
using Microsoft.EntityFrameworkCore;

namespace DemoPortalInternetBank.Migrator
{
    class Program
    {
        static void Main(string[] args)
        {
            var connectionString = args[0];

            var builder = new DbContextOptionsBuilder().UseNpgsql(connectionString);

            var ctx = new EfDbContext(builder.Options);

            ctx.Database.Migrate();

            DatabaseSeed.Seed(ctx);
        }
    }
}