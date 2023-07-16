using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

using webapi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthorization();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
	options.TokenValidationParameters = new TokenValidationParameters
	{
		ValidateIssuer = true,
		ValidIssuer = AuthOptions.ISSUER,
		ValidateAudience = true,
		ValidAudience = AuthOptions.AUDIENCE,
		ValidateLifetime = true,
		IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
		ValidateIssuerSigningKey = true
	};
});


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<MyUserManager>();

builder.Services.AddDbContext<AuthTestDbContext>(
options =>
	options.UseSqlServer(
			builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapFallbackToFile("index.html");

app.UseAuthentication();
app.UseAuthorization();

app.AddWeatherForecast();
app.AddLogin();
app.AddRegister();

app.MapGet("/api/data",[Authorize]  (HttpContext context) => $"Hello World!");


app.UseHttpsRedirection();
app.MapControllers();

app.Run();


public class AuthOptions
{
	public const string ISSUER = "FliksAuthServer";
	public const string AUDIENCE = "SomeClient";
	const string KEY = "some_supersecret_key_ofauth_token";
	public static SymmetricSecurityKey GetSymmetricSecurityKey() =>
	  new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
}