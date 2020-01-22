using System.Collections.Generic;
using System.Linq;

namespace DemoPortalInternetBank.Domain.Interfaces
{
    public abstract class Repository<T> : IRepository<T> where T : class
    {
        private readonly EfDbContext _context;

        protected Repository(EfDbContext context)
        {
            _context = context;
        }

        public virtual IQueryable<T> GetAll()
        {
            return _context.Set<T>();
        }

        public virtual T Add(T model)
        {
            _context.Set<T>().Add(model);
            return model;
        }

        public void AddRange(IEnumerable<T> model)
        {
            _context.Set<T>().AddRange(model);
        }

        public virtual T Update(T model)
        {
            _context.Set<T>().Update(model);
            return model;
        }

        public void UpdateRange(IEnumerable<T> model)
        {
            _context.Set<T>().UpdateRange(model);
        }

        public virtual void Remove(T model)
        {
            _context.Set<T>().Remove(model);
        }

        public void RemoveRange(IEnumerable<T> model)
        {
            _context.Set<T>().RemoveRange(model);
        }
    }
}