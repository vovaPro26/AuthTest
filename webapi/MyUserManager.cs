using Microsoft.AspNetCore.Identity;

namespace webapi
{
	public class MyUser : IdentityUser
	{
		//public string Email { get; set; }
		public string? Password { get; set; }
	}
	public class MyUserManager
	{

		List<MyUser> myUsers = new List<MyUser>();
		public void AddUser(MyUser user)
		{
			myUsers.Add(user);
		}
		public MyUser? Find(string email, string password)
		{
			return myUsers.Find(myUser => myUser.Email == email && myUser.Password == password );
		}
		public MyUser? FindByEmail(string email){
			return myUsers.Find(myUser => myUser.Email == email);
		}
	}

	
}
