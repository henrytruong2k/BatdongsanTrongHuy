using AutoMapper;
using BatDongSanProject.Application.Interfaces.Repositories;
using BatDongSanProject.Application.Wrappers;
using KinhDoanhBatDongSan.Models;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BatDongSanProject.Application.Features.Posts.Command.CreatePost
{
    public partial class CreatePostCommand : IRequest<Response<int>>
    {
        public string Title { get; set; }

        public string Street { get; set; }

        public string Country { get; set; }

        public string City { get; set; }

        public string District { get; set; }

        public string Description { get; set; }

        public float FrontiSpiece { get; set; }

        public float Wayin { get; set; }

        public string Direction { get; set; }

        public int NumberofFloor { get; set; }

        public int Bedroom { get; set; }

        public string Furniture { get; set; }

        public string Juridical { get; set; }

        public string Image { get; set; }

        public string LocationX { get; set; }

        public string LocationY { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public int MessageBoardType { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int FormalityId { get; set; }
      
        public int ProjectId { get; set; }
  
        public int CategoryId { get; set; }

        public int Status { get; set; }
      
    }
    public class CreatePostCommandHandler : IRequestHandler<CreatePostCommand, Response<int>>
    {
        private readonly IPostRepositoryAsync _postRepository;
        private readonly IMapper _mapper;
        public CreatePostCommandHandler(IPostRepositoryAsync postRepository, IMapper mapper)
        {
            _postRepository = postRepository;
            _mapper = mapper;
        }

        public async Task<Response<int>> Handle(CreatePostCommand request, CancellationToken cancellationToken)
        {
            request.Status = 1;
            var post = _mapper.Map<Post>(request);
            await _postRepository.AddAsync(post);
            return new Response<int>(post.Id);
        }
    }
}
