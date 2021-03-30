using AutoMapper;
using BatDongSanProject.Application.Features.Products.Commands.CreateProduct;
using BatDongSanProject.Application.Features.Products.Queries.GetAllProducts;
using BatDongSanProject.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BatDongSanProject.Application.Mappings
{
    public class GeneralProfile : Profile
    {
        public GeneralProfile()
        {
            CreateMap<Product, GetAllProductsViewModel>().ReverseMap();
            CreateMap<CreateProductCommand, Product>();
            CreateMap<GetAllProductsQuery, GetAllProductsParameter>();
        }
    }
}
