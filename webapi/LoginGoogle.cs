using Microsoft.AspNetCore.Identity;
using Google.Apis.Auth;
using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace webapi
{
	class GoogleLoginRequestDto
	{
		public string GoogleToken { get; set; }
	}
	public static class LoginGoogle
	{
		private static async Task<bool> ValidateGoogleToken(GoogleLoginRequestDto login)
		{
			try
			{
				var settings = new GoogleJsonWebSignature.ValidationSettings
				{
					Audience = new List<string> {"273047399993-fvbi5ls1tocl2p4v76gu7kk9rcmo5q3i.apps.googleusercontent.com"}
				};
				await GoogleJsonWebSignature.ValidateAsync(login.GoogleToken, settings);

			}
			catch (InvalidJwtException _)
			{
				return false;
			}

			return true;
		}
		public static WebApplication AddGoogleLogin(this WebApplication app)
		{
			app.MapPost("/api/googlelogin", async (GoogleLoginRequestDto login, UserManager<IdentityUser> manager) =>
			{
				await ValidateGoogleToken(login);
			});
			return app;
		}
	}
}