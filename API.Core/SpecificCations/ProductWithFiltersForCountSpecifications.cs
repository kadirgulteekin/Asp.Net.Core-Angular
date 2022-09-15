using API.Core.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Core.SpecificCations
{
    public class ProductWithFiltersForCountSpecifications:BaseSpecification<Product>
    {
        public ProductWithFiltersForCountSpecifications(ProductSpecParams productSpecParams)
             : base(x =>
            (!productSpecParams.BrandId.HasValue || x.ProductBrandId == productSpecParams.BrandId)
            &&
            (!productSpecParams.TypeId.HasValue || x.ProductTypeId == productSpecParams.TypeId)

            )
        {

        }
    }
}
