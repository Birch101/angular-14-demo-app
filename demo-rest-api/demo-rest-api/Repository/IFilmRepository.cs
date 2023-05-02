using demo_rest_api.Entities;

namespace demo_rest_api.Repository
{
  public interface IFilmRepository
  {
    public IEnumerable<Film> GetFilms();

    public IEnumerable<Film> FilmSearch();

    public Film UpdateFilm(Film film);

    public void DeleteFilm(int fileId);
  }
}
