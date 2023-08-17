using System.Net.Http;
using System.Text.Json.Serialization;
using FluentResults;

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
	public class FacebookLoginClient
	{
		private readonly IHttpClientFactory _httpClientFactory;
		private readonly IConfiguration _configuration;
		private readonly HttpClient _httpClient;
		private readonly List<string> _scopes = new List<string> { "id", "name", "first_name", "email" };
		public FacebookLoginClient(IHttpClientFactory httpClientFactory, IConfiguration configuration)
		{
			_httpClientFactory = httpClientFactory;
			_configuration = configuration;
			_httpClient = _httpClientFactory.CreateClient();
		}

		private async Task<bool> ValidateFacebookToken(string token)
		{
			var appAccessTokenResponse = await _httpClient.GetFromJsonAsync<FacebookAppAccessTokenResponse>($"https://graph.facebook.com/oauth/access_token?client_id={_configuration["Facebook:ClientId"]}&client_secret={_configuration["Facebook:ClientSecret"]}&grant_type=client_credentials");
			var response =
				await _httpClient.GetFromJsonAsync<FacebookTokenValidationResult>(
					$"https://graph.facebook.com/debug_token?input_token={token}&access_token={appAccessTokenResponse!.AccessToken}");

			if (response is null || !response.Data.IsValid)
			{
				return false;
			}
			if (appAccessTokenResponse.AccessToken != null)
			{
				return true;
			}
			return false;

		}
		public async Task<Result<FacebookUserData>> GetUserData(string token)
		{
			var validRes = await ValidateFacebookToken(token);
			if (!validRes)
			{
				return Result.Fail("Not valid token");
			}
			var reqUrl = $"https://graph.facebook.com/v17.0/me?fields={String.Join(",", _scopes)}&access_token={token}";
			var resultData = await _httpClient.GetFromJsonAsync<FacebookUserData>(reqUrl);
			if (resultData == null)
			{
				return Result.Fail("Error null");
			}
			return Result.Ok(resultData);
		}
	}
}
