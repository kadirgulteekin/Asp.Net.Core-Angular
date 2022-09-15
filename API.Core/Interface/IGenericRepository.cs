using API.Core.DbModels;
using API.Core.SpecificCations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Core.Interface
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<T> GeyByIdAsync(int id);
        Task<IReadOnlyList<T>> ListAllAsync();
        Task<T> GetEntityWithSpec(ISpecificCations<T> spec);
        Task<IReadOnlyList<T>> ListAsync(ISpecificCations<T> spec);

        Task<int> CountAsync(ISpecificCations<T> spec);
    }
}
