using BatDongSanProject.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinhDoanhBatDongSan.Models
{
    public class Project : AuditableBaseEntity
    {

        public string Name { get; set; }

        public string Address { get; set; }

        public string Distribution { get; set; }

        public float Acreage { get; set; }

        public int EnterpriseId { get; set; }
        public Enterprise Enterprise { get; set; }

        public ICollection<Post> Posts { get; set; }
    }
}
