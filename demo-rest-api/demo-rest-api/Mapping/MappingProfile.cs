using AutoMapper;
using demo_rest_api.DTO;
using demo_rest_api.Entities;

namespace demo_rest_api.Mapping
{
  public class MappingProfile : Profile
  {
    public MappingProfile()
    {
      CreateMap<Film, FilmDTO>().ReverseMap();
      CreateMap<FilmImage, FilmImageDTO>().ReverseMap();
    }
  }
}
