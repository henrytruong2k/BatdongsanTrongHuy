using BatDongSanProject.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinhDoanhBatDongSan.Models
{
    public class Formality : AuditableBaseEntity
    {
        public string Name { get; set; }

        public int Status { get; set; }

        public int IdParent { get; set; }

        public ICollection<Post> Posts { get; set; }
    }
}
