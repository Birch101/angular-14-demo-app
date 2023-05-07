using System.ComponentModel.DataAnnotations;

namespace demo_rest_api.Entities
{
  public class FilmImage
  {
    [Key]
    public int Id { get; set; }

    [MaxLength(2048)]
    public string? ImageURL { get; set; }  
  }
}
