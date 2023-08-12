using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace webapi
{
	public class FacebookAppAccessTokenResponse
	{
		[JsonPropertyName("access_token")]
		public string? AccessToken { get; set; }

		[JsonPropertyName("token_type")]
		public string? TokenType { get; set; }
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
		public static WebApplication AddFacebookLogin(this WebApplication app)
		{
			app.MapPost("/api/facebooklogin", async (FacebookLoginRequestDto login
				, UserManager<IdentityUser> manager, 
				IConfiguration _configuration,
				IHttpClientFactory _httpClientFactory
				) =>
			{

				async Task<bool> ValidateFacebookToken(FacebookLoginRequestDto request)
				{
					var httpClient = _httpClientFactory.CreateClient();
					var appAccessTokenResponse = await httpClient.GetFromJsonAsync<FacebookAppAccessTokenResponse>($"https://graph.facebook.com/oauth/access_token?client_id={_configuration["Facebook:ClientId"]}&client_secret={_configuration["Facebook:ClientSecret"]}&grant_type=client_credentials");
					var response =
						await httpClient.GetFromJsonAsync<FacebookTokenValidationResult>(
							$"https://graph.facebook.com/debug_token?input_token={request.FacebookToken}&access_token={appAccessTokenResponse!.AccessToken}");

					if (response is null || !response.Data.IsValid)
					{
						return false;
					}

					return true;
				}
				await ValidateFacebookToken(login);
			}
			);
			return app;
		}
	}
}