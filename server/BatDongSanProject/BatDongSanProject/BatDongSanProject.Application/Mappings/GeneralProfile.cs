using AutoMapper;
using BatDongSanProject.Application.DTOs;
using BatDongSanProject.Application.Features.Cities.Queries.GetAllCities;
using BatDongSanProject.Application.Features.Districts.Queries.GetDistrictsByCityId;
using BatDongSanProject.Application.Features.Posts.Command.CreatePost;
using BatDongSanProject.Application.Features.Posts.Queries.GetAllPosts;
using BatDongSanProject.Application.Features.Products.Commands.CreateProduct;
using BatDongSanProject.Application.Features.Products.Queries.GetAllProducts;
using BatDongSanProject.Domain.Entities;
using KinhDoanhBatDongSan.Models;
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

            CreateMap<GetAllCitiesQuery, GetAllCitiesParameter>();
            CreateMap<City, GetAllCitiesViewModel>().ReverseMap();

            CreateMap<GetDistrictsCityIdQuery, GetDistrictsByCityIdParameter>();
            CreateMap<District, GetDistrictsByCityIdViewModel>().ReverseMap();

            CreateMap<GetAllPostsQuery, GetAllPostsParameter>();
            CreateMap<Post, GetAllPostsViewModel>();
            CreateMap<CreatePostCommand, Post>();

            CreateMap<PostModel, CreatePostCommand>();
        }
    }
}
