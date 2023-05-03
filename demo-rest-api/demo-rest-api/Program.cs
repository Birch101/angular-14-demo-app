using demo_rest_api.Repository;
using demo_rest_api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var allowedPolicy = "_myPolicy";

builder.Services.AddCors(options =>
{
  options.AddPolicy(name: allowedPolicy,
                    policy =>
                    {
                      // TODO: this is not secure
                      policy.WithOrigins("*");
                      policy.AllowAnyHeader();
                    });
});

builder.Services.AddScoped<IFilmRepository, FilmRepository>();
builder.Services.AddScoped<IFilmService, FilmService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.UseCors(allowedPolicy);

app.UseAuthorization();

app.MapControllers();

app.Run();
