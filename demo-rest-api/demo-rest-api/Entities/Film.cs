using System.ComponentModel.DataAnnotations;

namespace demo_rest_api.Entities
{
  public class Film
  {
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(100)]
    public string? Year { get; set; }

    [MaxLength(50)]
    public string? Rated { get; set; }

    public DateTime? Released { get; set; }

    public int? RuntimeMinutes { get; set; }

    [MaxLength(200)]
    public string? Genre { get; set; }

    [MaxLength(200)]
    public string? Director { get; set; }

    [MaxLength(200)]
    public string? Writer { get; set; }

    [MaxLength(200)]
    public string? Actors { get; set; }

    [Required]
    [MaxLength(200)]
    public string? Plot { get; set; }

    [MaxLength(200)]
    public string? Language { get; set; }

    [MaxLength(200)]
    public string? Country { get; set; }

    [MaxLength(200)]
    public string? Awards { get; set; }

    [MaxLength(2048)]
    public string? Poster { get; set; }

    [Range(0, 100)]
    public int? Metascore { get; set; }

    [Range(0, 10)]
    public double? imdbRating { get; set; }
    public int? imdbVotes { get; set; }

    [MaxLength(50)]
    public string? imdbID { get; set; }

    [Required]
    [MaxLength(20)]
    public string Type { get; set; } = string.Empty;
    public bool? Response { get; set; }
    public List<FilmImage> Images { get; set; } = new List<FilmImage>();
  }
}
