﻿using API.Core.DbModels;
using System.Linq.Expressions;

namespace API.Core.SpecificCations
{
    public class ProductWithProductTypeAndBrandsSpecifications : BaseSpecification<Product>
    {
        public ProductWithProductTypeAndBrandsSpecifications(ProductSpecParams productSpecParams)
            :base(x=>
            (!productSpecParams.BrandId.HasValue || x.ProductBrandId == productSpecParams.BrandId)
            &&
            (!productSpecParams.TypeId.HasValue || x.ProductTypeId== productSpecParams.TypeId)

            )
           
        {
            AddInclude(x => x.ProductBrand);
            AddInclude(x => x.ProductType);
            //AddOrderBy(x => x.Name);

            ApplyPaging(productSpecParams.PageSize * (productSpecParams.PageIndex - 1), productSpecParams.PageSize);

            if (!string.IsNullOrWhiteSpace(productSpecParams.Sort))
            {
                switch (productSpecParams.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(p => p.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(p => p.Price);
                        break;
                        default:
                  
                        AddOrderBy(x=> x.Name);
                        break;
                }
            }

        }

        public ProductWithProductTypeAndBrandsSpecifications(int id)
            :base(x=>x.Id==id)
        {
            AddInclude(x => x.ProductBrand);
            AddInclude(x => x.ProductType);
        }
    }
}
