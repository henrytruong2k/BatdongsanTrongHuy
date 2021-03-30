using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinhDoanhBatDongSan.Models
{
    public class Category
    {
        public int Id { get ; set; }
        
        public string Name { get; set; }

        public DateTime PublishDate { get; set; }

        public int Status { get; set; }

        public ICollection<Post> Posts { get; set; }
    }
}
