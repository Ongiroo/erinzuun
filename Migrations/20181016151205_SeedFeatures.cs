using Microsoft.EntityFrameworkCore.Migrations;

namespace erinzuun.Migrations
{
    public partial class SeedFeatures : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Mileage')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Average')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Auto-Driving')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Features WHERE Name IN ('Mileage', 'Average', 'Auto-Driving')");
        }
    }
}
