using BatDongSanProject.Application.Filters;
using System;
using System.Collections.Generic;
using System.Text;

namespace BatDongSanProject.Application.Features.Districts.Queries.GetDistrictsByCityId
{
    public class GetDistrictsByCityIdParameter : RequestParameter
    {
        public int CityId { get; set; }
    }
}
