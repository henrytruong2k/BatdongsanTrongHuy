using BatDongSanProject.Application.Exceptions;
using BatDongSanProject.Application.Interfaces.Repositories;
using BatDongSanProject.Application.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BatDongSanProject.Application.Features.Posts.Command.DeletePostById
{
    public class DeletePostByIdCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }
        public class DeletePostByIdCommandHandler : IRequestHandler<DeletePostByIdCommand, Response<int>>
        {
            private readonly IPostRepositoryAsync _postRepository;

            public DeletePostByIdCommandHandler(IPostRepositoryAsync postRepository)
            {
                _postRepository = postRepository;
            }
            public async Task<Response<int>> Handle(DeletePostByIdCommand command, CancellationToken cancellationToken)
            {
                var post = await _postRepository.GetByIdAsync(command.Id);
                if (post == null) throw new ApiException($"Post Not Found.");
                await _postRepository.DeleteAsync(post);
                return new Response<int>(post.Id);
            }
        }
    }
}
