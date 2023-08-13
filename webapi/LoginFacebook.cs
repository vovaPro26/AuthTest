using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Json;
using System.Security.Claims;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace webapi
{
	public class FacebookAppAccessTokenResponse
	{
		[JsonPropertyName("access_token")]
		public string? AccessToken { get; set; }

		[JsonPropertyName("token_type")]
		public string? TokenType { get; set; }
	}

	public class FacebookUserData
	{
		[JsonPropertyName("id")]
		public string UserId { get; set; }
		[JsonPropertyName("name")]
		public string UserName { get; set; }
		[JsonPropertyName("first_name")]
		public string FirstName { get; set; }
		[JsonPropertyName("email")]
		public string UserEmail { get; set; }
	}
	public class FacebookTokenValidationData
	{
		[JsonPropertyName("app_id")] public string AppId { get; set; } = null!;

		[JsonPropertyName("type")] public string Type { get; set; } = null!;

		[JsonPropertyName("application")] public string Application { get; set; } = null!;

		[JsonPropertyName("data_access_expires_at")] public int DataAccessExpiresAt { get; set; }

		[JsonPropertyName("expires_at")] public int ExpiresAt { get; set; }

		[JsonPropertyName("is_valid")] public bool IsValid { get; set; }

		[JsonPropertyName("scopes")] public List<string> Scopes { get; set; } = null!;

		[JsonPropertyName("user_id")] public string UserId { get; set; } = null!;
	}

	public class FacebookTokenValidationResult
	{
		[JsonPropertyName("data")] public FacebookTokenValidationData Data { get; set; } = null!;
	}
	class FacebookLoginRequestDto
	{
		public string FacebookToken { get; set; }
	}
	public static class LoginFacebook
	{
		private const string provider = "Facebook";
		public static WebApplication AddFacebookLogin(this WebApplication app)
		{
			app.MapPost("/api/facebooklogin", async (FacebookLoginRequestDto login
				, UserManager<IdentityUser> manager,
				FacebookLoginClient loginClient
				) =>
			{	
				
				
				var userDataResult = await loginClient.GetUserData( login.FacebookToken );
				if (userDataResult.IsFailed)
				{
					return Results.BadRequest(userDataResult.Errors); 
				}
				var userData = userDataResult.Value;

				
				var info = new UserLoginInfo(provider, userData.UserId, provider);
				var user = await manager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);

				if (user == null)
				{
					user = await manager.FindByEmailAsync(userData.UserEmail);
					if (user == null)
					{
						user = new IdentityUser { Email = userData.UserEmail, UserName = userData.UserEmail };
						await manager.CreateAsync(user);
						//prepare and send an email for the email confirmation

						var iRes = await manager.AddLoginAsync(user, info);
					}
				}
				var claims = new List<Claim> {
						new Claim(ClaimTypes.Name, userData.UserName) ,
						new Claim(ClaimTypes.Email, userData.UserEmail)
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
			);
			return app;
		}
	}
}