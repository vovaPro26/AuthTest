using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


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
			app.MapPost("/api/register", async (RegisterRequestDto register, [FromServices] UserManager<IdentityUser> manager) =>
			{
				IdentityUser? myUser = await manager.FindByEmailAsync(register.Email);
				if (myUser == null)
				{
					var user = new IdentityUser()
					{
						UserName = register.Email, 
						Email = register.Email
					};
					var res = await manager.CreateAsync(user, register.Password);
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
