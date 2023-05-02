using demo_rest_api.Entities;
using demo_rest_api.Repository;
using Microsoft.AspNetCore.Mvc;

namespace demo_rest_api.Controllers
{
  [ApiController]
  [Route("films")]
  public class FilmController : ControllerBase
  {
    private readonly ILogger<FilmController> _logger;

    private IFilmRepository _filmRepository;

    public FilmController(ILogger<FilmController> logger, IFilmRepository filmRepository)
    {
      _logger = logger;
      _filmRepository = filmRepository;
    }

    [HttpGet]
    public IEnumerable<Film> GetFilms()
    {
      return _filmRepository.GetFilms();
    }

    [HttpGet]
    [Route("search")]
    public IEnumerable<Film> SearchFilms()
    {
      return _filmRepository.FilmSearch();
    }

    [HttpPatch]
    [Route("{id}")]
    public void UpdateFilm(Film film)
    {
      _filmRepository.UpdateFilm(film);
    }

    [HttpDelete]
    [Route("{id}")]
    public void DeleteFilm(int id)
    {
      _filmRepository.DeleteFilm(id);
    }
  }
}
