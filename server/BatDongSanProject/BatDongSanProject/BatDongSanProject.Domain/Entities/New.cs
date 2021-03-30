using BatDongSanProject.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinhDoanhBatDongSan.Models
{
    public class New : AuditableBaseEntity
    {
     

        public string Title { get; set; }

        public string Content { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string UserId { get; set; }

        public int Status { get; set; }

        public ICollection<Comment> Comments { get; set; }
    }
}
