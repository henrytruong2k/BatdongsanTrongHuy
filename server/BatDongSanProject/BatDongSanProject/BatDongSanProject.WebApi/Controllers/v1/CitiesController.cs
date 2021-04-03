using BatDongSanProject.Application.Features.Cities.Queries.GetAllCities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BatDongSanProject.WebApi.Controllers.v1
{
    [ApiVersion("1.0")]
    public class CitiesController : BaseApiController
    {
        // GET: api/<controller>
        [HttpGet("GetAllCities")]
        public async Task<IActionResult> Get([FromQuery] GetAllCitiesParameter filter)
        {
            return Ok(await Mediator.Send(new GetAllCitiesQuery() { PageSize = filter.PageSize, PageNumber = filter.PageNumber }));
        }
    }
}
