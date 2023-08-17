using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Json;
using System.Security.Claims;
using System.Text.Json.Serialization;
using FluentResults;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace webapi
{
	class SosialLoginRequestDto
	{
		public string Token { get; set; }
		public string Provider { get; set; }
	}
	
	class SocialData
	{
		public string Email { get; set; }
		public string Name { get; set; }
		public string Id { get; set; }

	}
	
	public static class SocialLogin
	{
		private static async Task<GoogleJsonWebSignature.Payload?> ValidateGoogleToken(SosialLoginRequestDto login)
		{
			try
			{
				var payload = await GoogleJsonWebSignature.ValidateAsync(login.Token, null, false);
				return payload;
			}
			catch (InvalidJwtException)
			{
				return default;
			}
		}

		private static async Task<Result<SocialData>> ReturnUserDataFromProviders(FacebookLoginClient loginClient, SosialLoginRequestDto login)
		{
			SocialData socialData;
			
			if (login.Provider == "Facebook")
			{
				var userDataResult = await loginClient.GetUserData(login.Token);
				if (userDataResult.IsFailed)
				{
					return Result.Fail("User data not found");
				}

				var userData = userDataResult.Value;
				
				socialData = new SocialData {
					Email = userData.UserEmail,
					Name = userData.UserName,
					Id = userData.UserId
				};
				
				return Result.Ok(socialData);
			}
			else if (login.Provider == "Google")
			{
				var userData = await ValidateGoogleToken(login);
				if (userData == null)
					return Result.Fail("User data not found");

				socialData = new SocialData
				{

					Email = userData.Email,
					Name = userData.Name,
					Id = userData.Subject
				};
				return Result.Ok(socialData);
			}
			return Result.Fail("Not valid provider");
		}
		public static WebApplication AddSocialLogin(this WebApplication app)
		{
			app.MapPost("/api/socialLogin", async (SosialLoginRequestDto login
				, UserManager<IdentityUser> manager,
				FacebookLoginClient loginClient,
				CreatingRole createRole,
				Claims claim,
				RoleManager<IdentityRole> _roleManager
				) =>
			{
				var adminRole = await createRole.CreateRole(_roleManager, "Admin");
				var userRole = await createRole.CreateRole(_roleManager, "User");

				var userDataResult = await ReturnUserDataFromProviders(loginClient, login);
				if (userDataResult.IsFailed)
				{
					return Results.BadRequest();
				}
				var userData = userDataResult.Value;


				var info = new UserLoginInfo(login.Provider, userData.Id, login.Provider);
				var user = await manager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);

				if (user == null)
				{
					user = await manager.FindByEmailAsync(userData.Email);
					if (user == null)
					{
						user = new IdentityUser { Email = userData.Email, UserName = userData.Email };
						await manager.CreateAsync(user);
						//prepare and send an email for the email confirmation

						var iRes = await manager.AddLoginAsync(user, info);
					}
				}

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
						new Claim(ClaimTypes.Name, userData.Name) ,
						new Claim(ClaimTypes.Email, userData.Email)
					};
				foreach (var role in userRoles)
				{
					claims.Add(new Claim(ClaimTypes.Role, role));
				}
				var jwt = claim.ClaimsReturn(claims);
				return Results.Ok(new JwtSecurityTokenHandler().WriteToken(jwt));

			}
			);
			return app;
		}
	}
}