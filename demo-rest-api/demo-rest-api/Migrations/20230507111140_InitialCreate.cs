using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace demo_rest_api.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Films",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Year = table.Column<string>(type: "TEXT", maxLength: 100, nullable: true),
                    Rated = table.Column<string>(type: "TEXT", maxLength: 50, nullable: true),
                    Released = table.Column<DateTime>(type: "TEXT", nullable: true),
                    RuntimeMinutes = table.Column<int>(type: "INTEGER", nullable: true),
                    Genre = table.Column<string>(type: "TEXT", maxLength: 200, nullable: true),
                    Director = table.Column<string>(type: "TEXT", maxLength: 200, nullable: true),
                    Writer = table.Column<string>(type: "TEXT", maxLength: 200, nullable: true),
                    Actors = table.Column<string>(type: "TEXT", maxLength: 200, nullable: true),
                    Plot = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    Language = table.Column<string>(type: "TEXT", maxLength: 200, nullable: true),
                    Country = table.Column<string>(type: "TEXT", maxLength: 200, nullable: true),
                    Awards = table.Column<string>(type: "TEXT", maxLength: 200, nullable: true),
                    Poster = table.Column<string>(type: "TEXT", maxLength: 2048, nullable: true),
                    Metascore = table.Column<int>(type: "INTEGER", nullable: true),
                    imdbRating = table.Column<double>(type: "REAL", nullable: true),
                    imdbVotes = table.Column<int>(type: "INTEGER", nullable: true),
                    imdbID = table.Column<string>(type: "TEXT", maxLength: 50, nullable: true),
                    Type = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false),
                    Response = table.Column<bool>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Films", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FilmImages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ImageURL = table.Column<string>(type: "TEXT", maxLength: 2048, nullable: true),
                    FilmId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FilmImages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FilmImages_Films_FilmId",
                        column: x => x.FilmId,
                        principalTable: "Films",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_FilmImages_FilmId",
                table: "FilmImages",
                column: "FilmId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FilmImages");

            migrationBuilder.DropTable(
                name: "Films");
        }
    }
}
