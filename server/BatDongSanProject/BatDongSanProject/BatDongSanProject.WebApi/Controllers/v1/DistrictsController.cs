using BatDongSanProject.Application.Features.Districts.Queries.GetDistrictsByCityId;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace BatDongSanProject.WebApi.Controllers.v1
{
    [ApiVersion("1.0")]
    [ApiController]
    public class DistrictsController : BaseApiController
    {

        // GET: api/<controller>
        [HttpGet]
        public async Task<IActionResult> GetDistrictByCityId([FromQuery] GetDistrictsCityIdQuery filter, CancellationToken cancellationToken)
        {
            return Ok(await Mediator.Send(filter,cancellationToken));
        }
    }
}
