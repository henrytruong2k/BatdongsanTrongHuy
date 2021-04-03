using BatDongSanProject.Application.Features.Posts.Queries.GetAllPosts;
using BatDongSanProject.Application.Interfaces.Repositories;
using BatDongSanProject.Infrastructure.Persistence.Contexts;
using BatDongSanProject.Infrastructure.Persistence.Repository;
using KinhDoanhBatDongSan.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BatDongSanProject.Infrastructure.Persistence.Repositories
{
    public class PostRepositoryAsync : GenericRepositoryAsync<Post>, IPostRepositoryAsync
    {
        private readonly DbSet<Post> _posts;

        public PostRepositoryAsync(ApplicationDbContext dbContext):base(dbContext)
        {
            _posts = dbContext.Set<Post>();
        }

        public async Task<IReadOnlyList<Post>> GetAllPosts(GetAllPostsParameter parameter, CancellationToken cancellationToken)
        {
            var data = await _posts
                .Skip((parameter.PageNumber - 1) * parameter.PageSize)
                .Take(parameter.PageSize)
                .AsNoTracking().Include(p=>p.Category).Include(p=>p.Formality).Include(p=>p.Project).ToListAsync();
            return data;
        }

    }
}
