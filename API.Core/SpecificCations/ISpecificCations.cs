using System.Linq.Expressions;

namespace API.Core.SpecificCations
{
    public interface ISpecificCations<T>
    {
        Expression<Func<T, bool>> Criteria { get; }
        List<Expression<Func<T, object>>> Includes { get; }
    }
}
 