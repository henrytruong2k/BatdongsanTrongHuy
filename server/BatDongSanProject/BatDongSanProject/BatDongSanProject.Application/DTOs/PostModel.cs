using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BatDongSanProject.Application.DTOs
{
    public class PostModel
    {
        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [Required]
        [StringLength(100)]
        [MinLength(5)]
        public string Street { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string District { get; set; }

        [StringLength(1000)]
        public string Description { get; set; }

        [Required]
        public float FrontiSpiece { get; set; }

        [Required]
        public float Wayin { get; set; }

        [Required]
        public string Direction { get; set; }

        [Required]
        public int NumberofFloor { get; set; }

        [Required]
        public int Bedroom { get; set; }

        [Required]
        public string Furniture { get; set; }

        [Required]
        public string Juridical { get; set; }

        [Required]
        [NotMapped]
        public IFormFile ImageFile { get; set; }

        public string Image { get; set; }

        [Required]
        public string LocationX { get; set; }

        [Required]
        public string LocationY { get; set; }

        [Required]
        [StringLength(100)]
        [MinLength(5)]
        public string Name { get; set; }

        [Required]
        [StringLength(200)]
        [MinLength(5)]
        public string Address { get; set; }

        [Required]
        [DataType(DataType.PhoneNumber)]
        public string Phone { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        public int MessageBoardType { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public int FormalityId { get; set; }

        [Required]
        public int ProjectId { get; set; }

        [Required]
        public int CategoryId { get; set; }
    }
}
