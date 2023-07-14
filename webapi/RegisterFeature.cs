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
			app.MapPost("/api/register", (RegisterRequestDto register, MyUserManager manager) =>
			{
				MyUser? myUser = manager.FindByEmail(register.Email);
				if (myUser == null)
				{
					var user = new MyUser()
					{
						Email = register.Email,
						Password = register.Password
					};
					manager.AddUser(user);
					return Results.Ok();

				}
				else
				{
					return Results.Conflict();
				}

			});
			return app;
		}
	}
}
