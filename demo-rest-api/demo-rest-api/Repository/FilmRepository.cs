using AutoMapper;
using demo_rest_api.Context;
using demo_rest_api.DTO;
using demo_rest_api.Entities;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Reflection.Emit;

namespace demo_rest_api.Repository
{
  public class FilmRepository : IFilmRepository
  {
    private FilmContext _filmContext;

    public FilmRepository(IMapper mapper)
    {
      _filmContext = new FilmContext();

      SeedData();
    }

    /// <summary>
    /// Delete the film with match id and related film images.
    /// </summary>
    /// <param name="filmId">Id of film to delete</param>
    public void DeleteFilm(int filmId)
    {
      if (_filmContext.Films == null)
        throw new Exception("No films available");

      var film = _filmContext.Films.Include(x => x.Images).FirstOrDefault(x => x.Id == filmId);

      if (film == null)
      {
        throw new Exception($"Unable to delete film, no film with id {filmId} found.");
      }
      else
      {
        // remove images first as this is a foreign key
        _filmContext.FilmImages.RemoveRange(film.Images);

        _filmContext.Films.Remove(film);

        // TODO: handle errors on save
        _filmContext.SaveChanges();
      }
    }

    /// <summary>
    /// Find matching films starting with the most specific filter first and working down.
    /// </summary>
    /// <param name="search">Search parameters</param>
    /// <returns>Empty list or list of matching film(s)</returns>
    public IEnumerable<Film> FilmSearch(FilmSearchDTO search)
    {
      // We'll try and match on id first - if we find a match we stop and return it
      if (search.FilmId.HasValue)
      {
        var retrievedFilms = _filmContext.Films?.Include(x => x.Images).Where(x => x.Id == search.FilmId.Value);

        if (retrievedFilms != null)
          return retrievedFilms;
      }

      // If we have no match on id then use title search to return 0 or more matching films
      if (!string.IsNullOrWhiteSpace(search.FilmTitle))
      {
        var retrievedFilms = _filmContext.Films?.Include(x => x.Images).Where(x => x.Title.ToLower().Contains(search.FilmTitle.ToLower()));

        if (retrievedFilms != null)
          return retrievedFilms;
      }

      // no match, return empty list
      return Enumerable.Empty<Film>();
    }

    /// <summary>
    /// Get all films in the database.
    /// </summary>
    /// <returns>List of all films</returns>
    public IEnumerable<Film> GetFilms()
    {
      var films = _filmContext.Films?.Include(x => x.Images).ToList();

      if (films == null)
        return Enumerable.Empty<Film>();

      return films;
    }

    /// <summary>
    /// Add a single film
    /// </summary>
    /// <param name="film">Film to ada</param>
    /// <returns>Details of added film</returns>
    public Film AddFilm(Film film)
    {
      if (_filmContext.Films == null)
        throw new Exception("No films available");

      var addedFilm = _filmContext.Films.Add(film);

      if (addedFilm == null || addedFilm.Entity == null)
        throw new Exception("Film was not added successfully");

      // TODO: handle errors on save
      _filmContext.SaveChanges();

      return addedFilm.Entity;
    }

    /// <summary>
    /// Update a single film with new details.
    /// </summary>
    /// <param name="film">Details of film to update</param>
    /// <returns>Deails of updated film</returns>
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

        return updateFilm;
      }
    }

    private void SeedData()
    {
      // Assume if there are any films we don't need to seed data again
      if (_filmContext.Films != null && !_filmContext.Films.Any())
      {
        using (StreamReader r = new StreamReader(@"SampleData\film.json"))
        {
          string json = r.ReadToEnd();

          if (!string.IsNullOrWhiteSpace(json))
          {
            List<Film> films = JsonConvert.DeserializeObject<List<Film>>(json);

            _filmContext.AddRange(films);

            _filmContext.SaveChanges();
          }
        }
      }
    }
  }
}
