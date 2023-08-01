using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Win32;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

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
			app.MapPost("/api/login", async (LoginRequestDto login, UserManager<IdentityUser> manager) =>
			{
				IdentityUser? myUser = await manager.FindByEmailAsync(login.Email);
				if (myUser != null)
				{
					if (await manager.CheckPasswordAsync(myUser, login.Password))
					{

						var claims = new List<Claim> {
						new Claim("id", myUser.Id),
						new Claim(ClaimTypes.Name, login.Email) ,
						new Claim(ClaimTypes.Email, login.Email),
						new Claim(ClaimTypes.Role, "Admin")
					};
						var jwt = new JwtSecurityToken(
						issuer: AuthOptions.ISSUER,
						audience: AuthOptions.AUDIENCE,
						claims: claims,
						expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(2)),
						signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256
						));

						return Results.Ok(new JwtSecurityTokenHandler().WriteToken(jwt));

					}
					else
					{
						return Results.NotFound();
					}
				}
				else
				{
					return Results.NotFound();
				}
			});
			return app;
		}
	}
}
