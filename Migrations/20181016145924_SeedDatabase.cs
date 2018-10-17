using Microsoft.EntityFrameworkCore.Migrations;

namespace erinzuun.Migrations
{
    public partial class SeedDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Insert into Makes(Name) values('Tesla')");
            migrationBuilder.Sql("Insert into Models(Name,MakeId) Values('Model3',(Select Id from makes where Name='Tesla'))");
            migrationBuilder.Sql("Insert into Models(Name,MakeId) Values('ModelX',(Select Id from makes where Name='Tesla'))");
            migrationBuilder.Sql("Insert into Models(Name,MakeId) Values('ModelS',(Select Id from makes where Name='Tesla'))");

            migrationBuilder.Sql("Insert into Makes(Name) values('Ford')");
            migrationBuilder.Sql("Insert into Models(Name,MakeId) Values('Fiesta',(Select Id from makes where Name='Ford'))");
            migrationBuilder.Sql("Insert into Models(Name,MakeId) Values('Focus',(Select Id from makes where Name='Ford'))");
            migrationBuilder.Sql("Insert into Models(Name,MakeId) Values('Mondeo Fusion',(Select Id from makes where Name='Ford'))");

            migrationBuilder.Sql("Insert into Makes(Name) values('Hyundai')");
            migrationBuilder.Sql("Insert into Models(Name,MakeId) Values('I10',(Select Id from makes where Name='Hyundai'))");
            migrationBuilder.Sql("Insert into Models(Name,MakeId) Values('I20',(Select Id from makes where Name='Hyundai'))");
            migrationBuilder.Sql("Insert into Models(Name,MakeId) Values('Creta',(Select Id from makes where Name='Hyundai'))");

            migrationBuilder.Sql("Insert into Makes(Name) values('Honda')");
            migrationBuilder.Sql("Insert into Models(Name,MakeId) Values('City',(Select Id from makes where Name='Honda'))");
            migrationBuilder.Sql("Insert into Models(Name,MakeId) Values('BR-V',(Select Id from makes where Name='Honda'))");
            migrationBuilder.Sql("Insert into Models(Name,MakeId) Values('Accord',(Select Id from makes where Name='Honda'))");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("delete from Models");
            migrationBuilder.Sql("delete from Makes");
        }
    }
}
