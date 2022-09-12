using API.Core.DbModels;
using System.Linq.Expressions;

namespace API.Core.SpecificCations
{
    public class ProductWithProductTypeAndBrandsSpecifications : BaseSpecification<Product>
    {
        public ProductWithProductTypeAndBrandsSpecifications()
        {
            AddInclude(x => x.ProductBrand);
            AddInclude(x => x.ProductType);

        }

        public ProductWithProductTypeAndBrandsSpecifications(int id)
            :base(x=>x.Id==id)
        {
            AddInclude(x => x.ProductBrand);
            AddInclude(x => x.ProductType);
        }
    }
}
