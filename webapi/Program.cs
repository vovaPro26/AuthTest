using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.Text;

using webapi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AuthTestDbContext>(
options =>
	options.UseSqlServer(
			builder.Configuration.GetConnectionString("DefaultConnection")));

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
builder.Services.AddHttpClient();
builder.Services.AddIdentityCore<IdentityUser>()
	.AddRoles<IdentityRole>()
	.AddEntityFrameworkStores<AuthTestDbContext>();
builder.Services.AddTransient<FacebookLoginClient>();
builder.Services.AddTransient<CreatingRole>();
builder.Services.AddTransient<Claims>();




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
app.AddGoogleLogin();
app.AddFacebookLogin();
app.AddRegister();

app.MapGet("/api/data", [Authorize(Roles ="User")] (HttpContext context) => $"Hello User!");
	//.RequireAuthorization(new AuthorizeAttribute{ Roles = "User" });
//app.MapGet("/api/data", [AllowAnonymous] (HttpContext context) => $"Hello Anonim!");
app.MapGet("/api/securedata", [Authorize(Roles = "Admin")] (HttpContext context) => $"Hello Admin!");

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