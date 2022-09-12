using API.Core.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Core.Interface
{
    public interface IProductRepository
    {
        Task<Product> GetProductByIdAsync(int id); //Task anahtar kelimesi asenkron olması için yapıldı.

        //All Product List
        Task<IReadOnlyList<Product>> GetProductAsync();
        Task<IReadOnlyList<ProductType>> GetProductTypesAsync(); //Okunabilir tipt geri dönüş tipi
        Task<IReadOnlyList<ProductBrand>> GetProductBrandAsync();


    }
}
