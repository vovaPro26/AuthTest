using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace webapi
{
	//public class DataObjctOSMRRoute
	//{
	//	public string Config { get; set; }
	//	public string Data { get; set; }
	//	public string Request { get; set; }
	//	public string Status { get; set; }
	//	public string StatusText { get; set; }
	//	public string Prototype { get; set; }
	//}

	public class Route
	{
		public decimal Distance { get; set; }
		public decimal Duration { get; set; }
		public IEnumerable<Step> Legs { get; set; }
		public decimal Weight { get; set; }
		public string Weight_Name { get; set; }

	}

	public class Step
	{
		public decimal Distance { get; set; }
		public decimal Duration { get; set; }
		public IEnumerable<Steps> Steps { get; set; }
	}

	public class Steps
	{
		public decimal Distance { get; set; }
		public decimal Duration { get; set; }
		public string Geometry { get; set; }
	}

	public class Waypoint
	{
		public decimal Distance { get; set; }
		public string Hint { get; set; }
		public IEnumerable<object> Location { get; set; }
		public string Name { get; set; }
	}

	public class RouteData
	{
		public string Code { get; set; }
		public IEnumerable<Route> Routes { get; set; }
		public IEnumerable<Waypoint> Waypoints { get; set; }
	}
	public class RouteRequestDto
	{
        public RouteData RouteData { get; set; }
    }
	public static class OSMRoutesFeature
	{
		public static WebApplication AddRoute(this WebApplication app)
		{
			app.MapPost("/api/addroute", async ([FromBody]RouteRequestDto route) =>
			{
				Console.WriteLine(route);
			});
			return app;
		}
	}
}
