using demo_rest_api.DTO;
using Microsoft.AspNetCore.Mvc;

namespace demo_rest_api.Services
{
  public interface IFilmService
  {
    IEnumerable<FilmDTO> GetFilms();

    IEnumerable<FilmDTO> SearchFilms([FromBody] FilmSearchDTO search);

    FilmDTO AddFilm(FilmDTO film);

    FilmDTO UpdateFilm(FilmDTO film);

    void DeleteFilm(int id);
  }
}
