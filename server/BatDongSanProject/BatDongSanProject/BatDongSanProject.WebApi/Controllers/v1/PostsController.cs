using AutoMapper;
using BatDongSanProject.Application.DTOs;
using BatDongSanProject.Application.Features.Posts.Command.CreatePost;
using BatDongSanProject.Application.Features.Posts.Command.DeletePostById;
using BatDongSanProject.Application.Features.Posts.Queries.GetAllPosts;
using BatDongSanProject.WebApi.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BatDongSanProject.WebApi.Controllers.v1
{
    [ApiVersion("1.0")]
    public class PostsController : BaseApiController
    {
        private readonly IMapper mapper;
        private readonly IWebHostEnvironment _hostEnvironment;
        public PostsController(IMapper mapper, IWebHostEnvironment hostEnviroment)
        {
            this.mapper = mapper;
            _hostEnvironment = hostEnviroment;
        }

        // GET: api/<controller>
        [HttpGet("GetAllPosts")]
        public async Task<IActionResult> Get([FromQuery] GetAllPostsParameter filter)
        {
            return Ok(await Mediator.Send(new GetAllPostsQuery() { PageSize = filter.PageSize, PageNumber = filter.PageNumber }));
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await Mediator.Send(new DeletePostByIdCommand { Id = id }));
        }

        // POST api/<controller>
        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromForm] PostModel viewModel)
        {
           viewModel.Image = "https://batdongsanprojectwebapi.azurewebsites.net/Images/" + await SaveImage(viewModel.ImageFile);
           var command = mapper.Map<CreatePostCommand>(viewModel);
           return Ok(await Mediator.Send(command));
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName =  imageName + DateTime.Now.ToString("yymmss") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "wwwroot/Images", imageName);
            using(var fileStream = new FileStream(imagePath,FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }


    }
}
