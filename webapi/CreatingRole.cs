using Microsoft.AspNetCore.Identity;

namespace webapi
{
	public class CreatingRole
	{

		public async Task<IdentityRole> CreateRole(RoleManager<IdentityRole> roleManager, string roleName)
		{

			var adminRole = await roleManager.FindByNameAsync(roleName);
			if (adminRole == null)
			{
				adminRole = new() { Name = roleName, NormalizedName = roleName.ToUpper() };
				await roleManager.CreateAsync(adminRole);
			}
			return adminRole;
		}
	}
}
