namespace webapi
{
	class LoginRequestDto
	{
		public string Email { get; set; }
		public string Password { get; set; }
	}
	public static class LoginFeature
	{
		public static WebApplication AddLogin(this WebApplication app)
		{
			app.MapPost("/api/login", (LoginRequestDto login) =>
			{
				if (login.Email == "volodymyr.nik@gmail.com" && login.Password == "Qazwsxedc123!")
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
