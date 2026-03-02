using Microsoft.EntityFrameworkCore.Infrastructure;

namespace DemoPortalInternetBank.Domain.Interfaces
{
    public interface IDbTransactionService
    {
        void Commit();
        DatabaseFacade Database { get; }
    }
    
    public class DbTransactionService : IDbTransactionService
    {
        private readonly EfDbContext _context;

        public DbTransactionService(EfDbContext context)
        {
            _context = context;
        }

        public void Commit()
        {
            _context.SaveChanges();
        }

        public DatabaseFacade Database => _context.Database;
    }

}