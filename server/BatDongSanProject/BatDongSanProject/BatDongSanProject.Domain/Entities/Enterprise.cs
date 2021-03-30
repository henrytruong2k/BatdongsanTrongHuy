using BatDongSanProject.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinhDoanhBatDongSan.Models
{
    public class Enterprise : AuditableBaseEntity
    {
        public string Name { get; set; }

        public string Address { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public ICollection<Project> Projects { get; set; }
    }
}
