
using demo_rest_api.Entities;
using System.ComponentModel.DataAnnotations;

namespace demo_rest_api.DTO
{
  public class FilmDTO
  {
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Year { get; set; }
    public string? Rated { get; set; }
    public DateTime? Released { get; set; }
    public int? RuntimeMinutes { get; set; }
    public string? Genre { get; set; }
    public string? Director { get; set; }
    public string? Writer { get; set; }
    public string? Actors { get; set; }
    public string? Plot { get; set; }
    public string? Language { get; set; }
    public string? Country { get; set; }
    public string? Awards { get; set; }
    public string? Poster { get; set; }
    public int? Metascore { get; set; }
    public int? imdbRating { get; set; }
    public int? imdbVotes { get; set; }
    public string? imdbID { get; set; }
    public string Type { get; set; } = string.Empty;
    public bool? Response { get; set; }
    public List<FilmImageDTO> Images { get; set; } = new List<FilmImageDTO>();
  }
}
