using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace webapi
{
	public class AuthTestDbContext : IdentityDbContext<MyUser>
	{
		public AuthTestDbContext(DbContextOptions<AuthTestDbContext> options)
				: base(options)
		{
		}
	}
}
