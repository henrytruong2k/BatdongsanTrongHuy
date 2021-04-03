using BatDongSanProject.Application.Interfaces.Repositories;
using BatDongSanProject.Infrastructure.Persistence.Contexts;
using BatDongSanProject.Infrastructure.Persistence.Repository;
using KinhDoanhBatDongSan.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace BatDongSanProject.Infrastructure.Persistence.Repositories
{
    public class CityRepositoryAsync : GenericRepositoryAsync<City>, ICityRepositoryAsync
    {
        private readonly DbSet<City> _cities;

        public CityRepositoryAsync(ApplicationDbContext dbContext) : base(dbContext)
        {
            _cities = dbContext.Set<City>();
        }
    }
}
