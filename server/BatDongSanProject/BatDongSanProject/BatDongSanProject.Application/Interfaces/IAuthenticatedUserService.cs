using System;
using System.Collections.Generic;
using System.Text;

namespace BatDongSanProject.Application.Interfaces
{
    public interface IAuthenticatedUserService
    {
        string UserId { get; }
    }
}
