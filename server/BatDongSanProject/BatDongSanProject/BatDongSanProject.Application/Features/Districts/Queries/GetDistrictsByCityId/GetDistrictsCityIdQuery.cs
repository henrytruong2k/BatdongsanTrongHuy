using AutoMapper;
using BatDongSanProject.Application.Interfaces.Repositories;
using BatDongSanProject.Application.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BatDongSanProject.Application.Features.Districts.Queries.GetDistrictsByCityId
{
    public class GetDistrictsCityIdQuery : IRequest<PagedResponse<IEnumerable<GetDistrictsByCityIdViewModel>>>
    {
        public int CityId { get; set; }
    }

    public class GetDistrictsByCityIdQueryHandler : IRequestHandler<GetDistrictsCityIdQuery, PagedResponse<IEnumerable<GetDistrictsByCityIdViewModel>>>
    {
        private readonly IDistrictRepositoryAsync _districtRepository;
        private readonly IMapper _mapper;
        public GetDistrictsByCityIdQueryHandler(IDistrictRepositoryAsync districtRepository, IMapper mapper)
        {
            _districtRepository = districtRepository;
            _mapper = mapper;
        }

        public async Task<PagedResponse<IEnumerable<GetDistrictsByCityIdViewModel>>> Handle(GetDistrictsCityIdQuery request, CancellationToken cancellationToken)
        {
            var validFilter = _mapper.Map<GetDistrictsByCityIdParameter>(request);
            var district = await _districtRepository.GetDistrictsByCityId(validFilter,cancellationToken);
            var districtViewModel = _mapper.Map<IEnumerable<GetDistrictsByCityIdViewModel>>(district);
            return new PagedResponse<IEnumerable<GetDistrictsByCityIdViewModel>>(districtViewModel, validFilter.PageNumber, validFilter.PageSize);
        }
    }
}
