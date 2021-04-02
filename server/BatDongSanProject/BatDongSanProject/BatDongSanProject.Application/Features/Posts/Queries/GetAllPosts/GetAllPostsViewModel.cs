using KinhDoanhBatDongSan.Models;
using System;
using System.Collections.Generic;

namespace BatDongSanProject.Application.Features.Posts.Queries.GetAllPosts
{
    public class GetAllPostsViewModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Street { get; set; }

        public string Country { get; set; }

        public string City { get; set; }

        public string District { get; set; }

        public string Description { get; set; }

        public float FrontiSpiece { get; set; }

        public float Wayin { get; set; }

        public string Direction { get; set; }

        public int NumberofFloor { get; set; }

        public int Bedroom { get; set; }

        public string Furniture { get; set; }

        public string Juridical { get; set; }

        public string Image { get; set; }

        public string LocationX { get; set; }

        public string LocationY { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public int MessageBoardType { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public Formality Formality { get; set; }


        public Project Project { get; set; }


        public Category Category { get; set; }

        public ICollection<Comment> Comments { get; set; }

        public string CreatedBy { get; set; }
        public DateTime Created { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime? LastModified { get; set; }

        public int Status { get; set; }
    }


}
