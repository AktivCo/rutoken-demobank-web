using System.Collections.Generic;
using System.Linq;

namespace DemoPortalInternetBank.Domain.Interfaces
{
    public interface IRepository<T> where T : class
    {
        IQueryable<T> GetAll();
        T Add(T model);
        void AddRange(IEnumerable<T> model);
        T Update(T model);
        void UpdateRange(IEnumerable<T> model);
        void Remove(T model);
        void RemoveRange(IEnumerable<T> model);
    }
}