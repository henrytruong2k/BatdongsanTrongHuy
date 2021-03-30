using BatDongSanProject.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinhDoanhBatDongSan.Models
{
    public class Comment : AuditableBaseEntity
    {
        public string Content { get; set; }

        public string UserId { get; set; }

        public int PostId { get; set; }
        public Post Post { get; set; }
        
        public int NewId { get; set; }
        public New New { get; set; }


        public int Status { get; set; }
    }
}
