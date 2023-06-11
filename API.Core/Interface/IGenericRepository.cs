using API.Core.DbModels;
using API.Core.SpecificCations;

namespace API.Core.Interface
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<T> GetByIdAsync(int id);

        Task<IReadOnlyList<T>> ListAllAsync();

        Task<T> GetEntityWithSpec(ISpecificCations<T> spec);

        Task<IReadOnlyList<T>> ListAsync(ISpecificCations<T> spec);

        Task<int> CountAsync(ISpecificCations<T> spec);
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}
