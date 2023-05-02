using demo_rest_api.Entities;
using Microsoft.EntityFrameworkCore;

namespace demo_rest_api.Context
{
  public class FilmContext : DbContext
  {
    public DbSet<Film>? Films { get; set; }

    public string DbPath { get; }

    public FilmContext()
    {
      DbPath = @"SampleData\films.db";
    }

    /// <summary>
    /// Set the data source for the local Sqlite database.
    /// </summary>
    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source={DbPath}");

  }
}
