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
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    Year = table.Column<string>(type: "TEXT", nullable: false),
                    Rated = table.Column<string>(type: "TEXT", nullable: false),
                    Released = table.Column<string>(type: "TEXT", nullable: false),
                    Runtime = table.Column<string>(type: "TEXT", nullable: false),
                    Genre = table.Column<string>(type: "TEXT", nullable: false),
                    Director = table.Column<string>(type: "TEXT", nullable: false),
                    Writer = table.Column<string>(type: "TEXT", nullable: false),
                    Actors = table.Column<string>(type: "TEXT", nullable: false),
                    Plot = table.Column<string>(type: "TEXT", nullable: false),
                    Language = table.Column<string>(type: "TEXT", nullable: false),
                    Country = table.Column<string>(type: "TEXT", nullable: false),
                    Awards = table.Column<string>(type: "TEXT", nullable: false),
                    Poster = table.Column<string>(type: "TEXT", nullable: false),
                    Metascore = table.Column<string>(type: "TEXT", nullable: false),
                    imdbRating = table.Column<string>(type: "TEXT", nullable: false),
                    imdbVotes = table.Column<string>(type: "TEXT", nullable: false),
                    imdbID = table.Column<string>(type: "TEXT", nullable: false),
                    Type = table.Column<string>(type: "TEXT", nullable: false),
                    Response = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Films", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FilmImage",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ImageURL = table.Column<string>(type: "TEXT", nullable: true),
                    FilmId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FilmImage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FilmImage_Films_FilmId",
                        column: x => x.FilmId,
                        principalTable: "Films",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_FilmImage_FilmId",
                table: "FilmImage",
                column: "FilmId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FilmImage");

            migrationBuilder.DropTable(
                name: "Films");
        }
    }
}
