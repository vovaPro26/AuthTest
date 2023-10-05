namespace BusinesLogic
{
	public class Route : IEquatable<Route?>
	{
		public Route(Point startPoint, Point endPoint, GeometryArr geometry)
		{
			StartPoint = startPoint;
			EndPoint = endPoint;
			Geometry = geometry;
		}

		public Point StartPoint { get; set; }
		public Point EndPoint { get; set; }
		public GeometryArr Geometry { get; set; }

		public override bool Equals(object? obj)
		{
			return Equals(obj as Route);
		}

		public bool Equals(Route? other)
		{
			return other is not null &&
				   EqualityComparer<Point>.Default.Equals(StartPoint, other.StartPoint) &&
				   EqualityComparer<Point>.Default.Equals(EndPoint, other.EndPoint) &&
				   EqualityComparer<GeometryArr>.Default.Equals(Geometry, other.Geometry);
		}

		public override int GetHashCode()
		{
			return HashCode.Combine(StartPoint, EndPoint, Geometry);
		}

		public static bool operator ==(Route? left, Route? right)
		{
			return EqualityComparer<Route>.Default.Equals(left, right);
		}

		public static bool operator !=(Route? left, Route? right)
		{
			return !(left == right);
		}
	}
	public record class GeometryArr(Point GeomStartPoint, Point GeomEndPoint, string Encoded, PointsArr Points);
	public record class Point(double Lat, double Long);


	public record class PointsArr(Point PointsStartPoint, Point PointsEndPoint);


	public class RoutesChecker
	{
		public decimal CheckRoute(Route driverRoute, Route passengerRoute)
		{
			if (driverRoute == passengerRoute)
			{
				return 100m;
			}
			else
			{
				return 90m;
			}
		}
		
	}
}