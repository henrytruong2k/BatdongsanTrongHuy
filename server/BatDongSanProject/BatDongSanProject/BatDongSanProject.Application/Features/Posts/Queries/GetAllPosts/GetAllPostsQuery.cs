using AutoMapper;
using BatDongSanProject.Application.Interfaces.Repositories;
using BatDongSanProject.Application.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BatDongSanProject.Application.Features.Posts.Queries.GetAllPosts
{
    public class GetAllPostsQuery : IRequest<PagedResponse<IEnumerable<GetAllPostsViewModel>>>
    {
        public int PageSize { get; set; }
        public int PageNumber { get; set; }
    }

    public class GetAllPostsHandler : IRequestHandler<GetAllPostsQuery,PagedResponse<IEnumerable<GetAllPostsViewModel>>>
    {
        private readonly IPostRepositoryAsync postRepositoryAsync;
        private readonly IMapper mapper;
        public GetAllPostsHandler(IPostRepositoryAsync postRepositoryAsync, IMapper mapper)
        {
            this.postRepositoryAsync = postRepositoryAsync;
            this.mapper = mapper;
        }

        public async Task<PagedResponse<IEnumerable<GetAllPostsViewModel>>> Handle(GetAllPostsQuery request, CancellationToken cancellationToken)
        {
            var parameter = mapper.Map<GetAllPostsParameter>(request);
            var data = await postRepositoryAsync.GetAllPosts(parameter, cancellationToken);
            var postViewModel = mapper.Map<IEnumerable<GetAllPostsViewModel>>(data);
            return new PagedResponse<IEnumerable<GetAllPostsViewModel>>(postViewModel, parameter.PageNumber, parameter.PageSize);
        }

    }
     
}
