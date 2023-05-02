using System.ComponentModel.DataAnnotations;

namespace demo_rest_api.Entities
{
  public class FilmImage
  {
    [Key]
    public int Id { get; set; }

    public string? ImageURL { get; set; }  
  }
}
