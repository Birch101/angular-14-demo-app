using demo_rest_api.Repository;
using demo_rest_api.Services;

var allowedPolicy = "_myPolicy";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
  options.AddPolicy(name: allowedPolicy,
                    policy =>
                    {
                      // TODO: this is not secure
                      policy.WithOrigins("*");
                      policy.AllowAnyHeader();
                      policy.AllowAnyMethod();
                    });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped<IFilmRepository, FilmRepository>();
builder.Services.AddScoped<IFilmService, FilmService>();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseCors(allowedPolicy);

app.UseAuthorization();

app.MapControllers();

app.Run();
