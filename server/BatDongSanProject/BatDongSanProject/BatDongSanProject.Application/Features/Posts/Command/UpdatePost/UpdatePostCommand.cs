using BatDongSanProject.Application.Exceptions;
using BatDongSanProject.Application.Interfaces.Repositories;
using BatDongSanProject.Application.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BatDongSanProject.Application.Features.Posts.Command.UpdatePost
{
    public class UpdatePostCommand
    {
        public int Id { get; set; }
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
        //public class UpdateProductCommandHandler : IRequestHandler<UpdatePostCommand, Response<int>>
        //{
        //    private readonly IPostRepositoryAsync _postductRepository;
        //    public UpdatePostCommandHandler(IPostRepositoryAsync postRepository)
        //    {
        //        _postductRepository = postRepository;
        //    }
        //    public async Task<Response<int>> Handle(UpdatePostCommand command, CancellationToken cancellationToken)
        //    {
        //        var post = await _postductRepository.GetByIdAsync(command.Id);

        //        if (post == null)
        //        {
        //            throw new ApiException($"Post Not Found.");
        //        }
        //        else
        //        {
        //            product.Name = command.Name;
        //            product.Rate = command.Rate;
        //            product.Description = command.Description;
        //            await _productRepository.UpdateAsync(product);
        //            return new Response<int>(product.Id);
        //        }
        //    }
        //}
    }
}
