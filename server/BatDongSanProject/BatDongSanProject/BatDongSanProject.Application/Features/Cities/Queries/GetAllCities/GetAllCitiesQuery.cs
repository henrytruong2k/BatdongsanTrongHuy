using AutoMapper;
using BatDongSanProject.Application.Interfaces.Repositories;
using BatDongSanProject.Application.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BatDongSanProject.Application.Features.Cities.Queries.GetAllCities
{
    public class GetAllCitiesQuery : IRequest<PagedResponse<IEnumerable<GetAllCitiesViewModel>>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }

    public class GetAllCitiesQueryHandler : IRequestHandler<GetAllCitiesQuery, PagedResponse<IEnumerable<GetAllCitiesViewModel>>>
    {
        private readonly ICityRepositoryAsync _cityRepository;
        private readonly IMapper _mapper;
        public GetAllCitiesQueryHandler(ICityRepositoryAsync cityRepository, IMapper mapper)
        {
            _cityRepository = cityRepository;
            _mapper = mapper;
        }

        public async Task<PagedResponse<IEnumerable<GetAllCitiesViewModel>>> Handle(GetAllCitiesQuery request, CancellationToken cancellationToken)
        {
            var validFilter = _mapper.Map<GetAllCitiesParameter>(request);
            var city = await _cityRepository.GetPagedReponseAsync(validFilter.PageNumber, validFilter.PageSize);
            var cityViewModel = _mapper.Map<IEnumerable<GetAllCitiesViewModel>>(city);
            return new PagedResponse<IEnumerable<GetAllCitiesViewModel>>(cityViewModel, validFilter.PageNumber, validFilter.PageSize);
        }
    }
}
