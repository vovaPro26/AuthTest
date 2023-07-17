using Microsoft.AspNetCore.Identity;

namespace webapi
{
	public class MyUser : IdentityUser
	{
		public string? Password { get; set; }
	}
	

	
}
