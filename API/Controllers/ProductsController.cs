﻿
using API.Core.DbModels;
using API.Core.Interface;
using API.Core.SpecificCations;
using API.Dtos;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    public class ProductsController : BaseApiController
    {
        //private readonly StoreContext _context;

        //private readonly IProductRepository _productRepository;

        private readonly IGenericRepository<Product> _productRepository;

        private readonly IGenericRepository<ProductBrand> _productBrandRepository;

        private readonly IGenericRepository<ProductType> _productTypeRepository;

        public IMapper _mapper;

        public ProductsController(IGenericRepository<Product> productRepository,
            IGenericRepository<ProductBrand> productBrandRepository,
            IGenericRepository<ProductType> productTypeRepository,
            IMapper mapper)
        {
            _productRepository = productRepository;
            _productBrandRepository = productBrandRepository;
            _productTypeRepository = productTypeRepository;
            _mapper = mapper;
        }



     
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts()
        {
            var spec =new ProductWithProductTypeAndBrandsSpecifications();
            var data = await _productRepository.ListAsync(spec);
            //return Ok(data);

            //return data.Select(pro => new ProductToReturnDto
            //{
            //    Id = pro.Id,
            //    Name = pro.Name,
            //    Description = pro.Description,
            //    PictureUrl = pro.PictureUrl,
            //    Price = pro.Price,
            //    ProductBrand = pro.ProductBrand != null ? pro.ProductBrand.Name : string.Empty,
            //    ProductType = pro.ProductType != null ? pro.ProductType.Name : string.Empty
            //}).ToList();
            return Ok(_mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(data));

        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductWithProductTypeAndBrandsSpecifications(id);
            // return await _productRepository.GetEntityWithSpec(spec);
            var product = await _productRepository.GetEntityWithSpec(spec);
            //return new ProductToReturnDto
            //{
            //    Id = product.Id,
            //    Name = product.Name,
            //    Description= product.Description,
            //    PictureUrl= product.PictureUrl,
            //    Price = product.Price,
            //    ProductBrand=product.ProductBrand!=null? product.ProductBrand.Name : string.Empty,
            //    ProductType=product.ProductType!=null? product.ProductType.Name : string.Empty

            //};
            return _mapper.Map<Product, ProductToReturnDto>(product);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            return Ok(await _productBrandRepository.ListAllAsync());

        }
        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            return Ok(await _productTypeRepository.ListAllAsync());
        }
    }
}
