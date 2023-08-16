using Microsoft.AspNetCore.Identity;
using Google.Apis.Auth;
using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace webapi
{
	class GoogleLoginRequestDto
	{
		public string GoogleToken { get; set; }
	}
	public static class LoginGoogle
	{

		private static async Task<GoogleJsonWebSignature.Payload?> ValidateGoogleToken(GoogleLoginRequestDto login)
		{
			try
			{
				var payload = await GoogleJsonWebSignature.ValidateAsync(login.GoogleToken, null, false);
				return payload;
			}
			catch (InvalidJwtException)
			{
				return default;
			}
		}


		
		public static WebApplication AddGoogleLogin(this WebApplication app)
		{

			app.MapPost("/api/googlelogin", async (GoogleLoginRequestDto login, UserManager<IdentityUser> manager, RoleManager<IdentityRole> _roleManager, CreatingRole createRole,
				Claims claim) =>
			{
				var adminRole = await createRole.CreateRole(_roleManager, "Admin");
				var userRole = await createRole.CreateRole(_roleManager, "User");

				var payload = await ValidateGoogleToken(login);
				if (payload == null)
					return Results.BadRequest();

				var info = new UserLoginInfo("Google", payload.Subject, "Google");
				var user = await manager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);

				if (user == null)
				{
					user = await manager.FindByEmailAsync(payload.Email);
					if (user == null)
					{
						user = new IdentityUser { Email = payload.Email, UserName = payload.Email };
						var crRes = await manager.CreateAsync(user);
						if (!crRes.Succeeded)
						{
							return Results.BadRequest(crRes.Errors);
						}
						//prepare and send an email for the email confirmation
						//await manager.AddToRoleAsync(user, "Viewer");
						await manager.AddLoginAsync(user, info);
					}
					else
					{
						await manager.AddLoginAsync(user, info);
					}
				}
				if (user == null)
					return Results.BadRequest("Invalid External Authentication.");
				//check for the Locked out account
				//var token = await GenerateToken(user);

				if (user.Email == "voffka.nik@gmail.com")
				{
					IdentityResult roleresult = await manager.AddToRoleAsync(user, adminRole.Name);
				}
				else
				{
					IdentityResult roleresult = await manager.AddToRoleAsync(user, userRole.Name);
				}

				var userRoles = await manager.GetRolesAsync(user);

				var claims = new List<Claim> {
						new Claim(ClaimTypes.Name, payload.Name) ,
						new Claim(ClaimTypes.Email, payload.Email)
					};
				foreach (var role in userRoles)
				{
					claims.Add(new Claim(ClaimTypes.Role, role));
				}

				var jwt = claim.ClaimsReturn(claims);
				return Results.Ok(new JwtSecurityTokenHandler().WriteToken(jwt));
			});
			return app;
		}
	}
}

