using demo_rest_api.DTO;
using demo_rest_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace demo_rest_api.Controllers
{
  [ApiController]
  [Route("films")]
  public class FilmController : ControllerBase
  {
    private readonly ILogger<FilmController> _logger;

    private IFilmService _filmService;

    public FilmController(ILogger<FilmController> logger, IFilmService filmService)
    {
      _logger = logger;
      _filmService = filmService;
    }

    /// <summary>
    /// Retrieve a list of all films.
    /// </summary>
    /// <returns>List of all films</returns>
    [HttpGet]
    public IEnumerable<FilmDTO> GetFilms()
    {
      return _filmService.GetFilms();
    }

    /// <summary>
    /// Search for films matching certain critera.
    /// </summary>
    /// <returns>Matching list of films</returns>
    [HttpPost]
    [Route("search")]
    public IEnumerable<FilmDTO> SearchFilms([FromBody]FilmSearchDTO search)
    {
      return _filmService.SearchFilms(search);
    }

    /// <summary>
    /// Add a film.
    /// </summary>
    /// <param name="film">File to add</param>
    [HttpPost]
    [Route("")]
    public FilmDTO AddFilm(FilmDTO film)
    {
      return _filmService.AddFilm(film);
    }

    /// <summary>
    /// Update a single film.
    /// </summary>
    /// <param name="film">Details of film to update</param>
    [HttpPatch]
    [Route("{id}")]
    public FilmDTO UpdateFilm(FilmDTO film)
    {
      return _filmService.UpdateFilm(film);
    }

    /// <summary>
    /// Delete one film with matching id.
    /// </summary>
    /// <param name="id">Id of film to delete</param>
    [HttpDelete]
    [Route("{id}")]
    public void DeleteFilm([FromRoute] int id)
    {
      _filmService.DeleteFilm(id);
    }
  }
}
