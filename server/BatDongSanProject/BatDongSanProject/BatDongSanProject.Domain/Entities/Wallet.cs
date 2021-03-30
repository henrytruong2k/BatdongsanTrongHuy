using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KinhDoanhBatDongSan.Models
{
    public class Wallet
    {
        public int Id { get; set; }

        public double CurrentMoney { get; set; }

        public double MoneyDeals { get; set; }

        public string UserId { get; set; }
      
        public int Status { get; set; }

    }
}
