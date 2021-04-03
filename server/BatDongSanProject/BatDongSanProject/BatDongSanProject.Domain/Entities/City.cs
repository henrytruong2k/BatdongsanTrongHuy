using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinhDoanhBatDongSan.Models
{
    public class City
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Slug { get; set; }

        public ICollection<District> Districts { get; set; }


    }
}
