using AutoMapper;
using demo_rest_api.DTO;
using demo_rest_api.Entities;
using demo_rest_api.Repository;
using Microsoft.AspNetCore.Mvc;

namespace demo_rest_api.Services
{
  public class FilmService : IFilmService
  {
    private IFilmRepository _filmRepository;

    private readonly IMapper _mapper;

    public FilmService(IFilmRepository filmRepository, IMapper mapper)
    {
      _filmRepository = filmRepository;
      _mapper = mapper;
    }

    /// <summary>
    /// Get all films, convert to DTO and return them.
    /// </summary>
    /// <returns>List of FilmDTO</returns>
    public IEnumerable<FilmDTO> GetFilms()
    {
      return _mapper.Map<IEnumerable<FilmDTO>>(_filmRepository.GetFilms());
    }

    /// <summary>
    /// Find matching films starting with the most specific filter first and working down.
    /// </summary>
    /// <param name="search">Search parameters</param>
    /// <returns>Empty list or list of matching film(s)</returns>
    public IEnumerable<FilmDTO> SearchFilms([FromBody] FilmSearchDTO search)
    {
      return _mapper.Map<IEnumerable<FilmDTO>>(_filmRepository.FilmSearch(search));
    }

    /// <summary>
    /// Add film and return added film.
    /// </summary>
    /// <param name="film">Film to add</param>
    /// <returns>Added film</returns>
    public FilmDTO AddFilm(FilmDTO film)
    {
      var filmEntity = _mapper.Map<Film>(film);

      return _mapper.Map<FilmDTO>(_filmRepository.AddFilm(filmEntity));
    }

    /// <summary>
    /// Update film and returned updatd film
    /// </summary>
    /// <param name="film">Film details to update with</param>
    /// <returns>Updated film</returns>
    public FilmDTO UpdateFilm(FilmDTO film)
    {
      var filmEntity = _mapper.Map<Film>(film);

      return _mapper.Map<FilmDTO>(_filmRepository.UpdateFilm(filmEntity));
    }

    /// <summary>
    /// Delete a single film matching on id.
    /// </summary>
    /// <param name="id">Id of film to delete</param>
    public void DeleteFilm(int id)
    {
      _filmRepository.DeleteFilm(id);
    }
  }
}
