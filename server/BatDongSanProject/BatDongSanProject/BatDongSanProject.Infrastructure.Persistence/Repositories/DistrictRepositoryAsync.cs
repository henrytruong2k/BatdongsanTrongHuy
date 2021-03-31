using BatDongSanProject.Application.Features.Districts.Queries.GetDistrictsByCityId;
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
    public class DistrictRepositoryAsync : GenericRepositoryAsync<District>, IDistrictRepositoryAsync
    {
        private readonly DbSet<District> _districts;

        public DistrictRepositoryAsync(ApplicationDbContext dbContext) : base(dbContext)
        {
            _districts = dbContext.Set<District>();
        }

        public async Task<IReadOnlyList<District>> GetDistrictsByCityId(GetDistrictsByCityIdParameter  parameter, CancellationToken cancellationToken )
        {
            return await _districts.Where(p=>p.CityId == parameter.CityId)
                .Skip((parameter.PageNumber - 1) * parameter.PageSize)
                .Take(parameter.PageSize)
                .AsNoTracking().ToListAsync();
        }

    }
}
