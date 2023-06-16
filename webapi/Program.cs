

using webapi;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

string[] Summaries = new[]
	{
		"Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
	};



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.MapGet("/WeatherForecastNew", () =>
{
	return Enumerable.Range(1, 5).Select(index => new WeatherForecast
	{
		Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
		TemperatureC = Random.Shared.Next(-20, 55),
		Summary = Summaries[Random.Shared.Next(Summaries.Length)]
	})
	   .ToArray();
});
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
