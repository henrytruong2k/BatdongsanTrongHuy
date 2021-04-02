using BatDongSanProject.Application.Features.Posts.Queries.GetAllPosts;
using KinhDoanhBatDongSan.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BatDongSanProject.Application.Interfaces.Repositories
{
    public interface IPostRepositoryAsync : IGenericRepositoryAsync<Post>
    {
        Task<IReadOnlyList<Post>> GetAllPosts(GetAllPostsParameter parameter, CancellationToken cancellationToken);
    }
}
