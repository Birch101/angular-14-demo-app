using demo_rest_api.Context;
using demo_rest_api.Entities;

namespace demo_rest_api.Repository
{
  public class FilmRepository : IFilmRepository
  {
    private FilmContext _filmContext;

    public FilmRepository()
    {
      _filmContext = new FilmContext();
    }

    public void DeleteFilm(int fileId)
    {
      if (_filmContext.Films == null)
        throw new Exception("No films available");

      var film = _filmContext.Films.Find(fileId);

      if (film == null)
      {
        throw new Exception($"Unable to delete film, no film with id {fileId} found.");
      }
      else
      {
        _filmContext.Films.Remove(film);

        // TODO: handle errors on save
        _filmContext.SaveChanges();
      }
    }

    public IEnumerable<Film> FilmSearch()
    {
      throw new NotImplementedException();
    }

    public IEnumerable<Film> GetFilms()
    {
      var films = _filmContext.Films;

      if (films == null)
        return Enumerable.Empty<Film>();

      return films;
    }

    public Film UpdateFilm(Film film)
    {
      if (_filmContext.Films == null)
        throw new Exception("No films available");

      var updateFilm = _filmContext.Films.Find(film.Id);

      if (updateFilm == null)
      {
        throw new Exception($"Unable to update film, no film with id {film.Id} found.");
      }
      else
      {
        _filmContext.Entry(updateFilm).CurrentValues.SetValues(film);

        // TODO: handle errors on save
        _filmContext.SaveChanges();

        return film;
      }
    }
  }
}
