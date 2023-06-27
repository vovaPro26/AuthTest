namespace webapi
{
	class RegisterRequestDto
	{
		public string Email { get; set; }
		public string Password { get; set; }
	}
	public static class RegisterFeature
	{
		public static WebApplication AddRegister(this WebApplication app)
		{
			app.MapPost("/api/register", (RegisterRequestDto register) =>
			{
				if (register.Email == "volodymyr.nik@gmail.com" && register.Password == "Qazwsxedc123!")
				{
					return Results.NoContent();
				}
				else
				{
					return Results.BadRequest();
				}
			});
			return app;
		}
	}
}
