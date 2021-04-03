using BatDongSanProject.Application.Features.Districts.Queries.GetDistrictsByCityId;
using KinhDoanhBatDongSan.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BatDongSanProject.Application.Interfaces.Repositories
{
    public interface IDistrictRepositoryAsync : IGenericRepositoryAsync<District>
    {
        public Task<IReadOnlyList<District>> GetDistrictsByCityId(GetDistrictsByCityIdParameter parameter, CancellationToken cancellationToken);
    }
}
