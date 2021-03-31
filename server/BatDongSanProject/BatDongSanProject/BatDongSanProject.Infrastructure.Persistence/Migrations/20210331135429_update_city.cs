using Microsoft.EntityFrameworkCore.Migrations;

namespace BatDongSanProject.Infrastructure.Persistence.Migrations
{
    public partial class update_city : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Slug",
                table: "Cities",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Slug",
                table: "Cities");
        }
    }
}
