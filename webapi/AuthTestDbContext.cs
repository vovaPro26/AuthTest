using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace webapi
{
	public class AuthTestDbContext : IdentityDbContext<IdentityUser>
	{
		public AuthTestDbContext(DbContextOptions<AuthTestDbContext> options)
				: base(options)
		{
		}
	}
}
