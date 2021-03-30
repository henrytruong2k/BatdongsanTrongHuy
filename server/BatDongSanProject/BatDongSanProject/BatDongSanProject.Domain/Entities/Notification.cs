using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinhDoanhBatDongSan.Models
{
    public class Notification
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public string Title { get; set; }

        public string UserId { get; set; }

        public int Status { get; set; }
    }
}
