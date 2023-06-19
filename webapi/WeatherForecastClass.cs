namespace webapi
{
	public static class WeatherForecastClass
	{
		static string[] Summaries = new[]
			{
				"Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
			};
		public static WebApplication AddWeatherForecast(this WebApplication app)
		{
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
			return app;
		}

	}
}
