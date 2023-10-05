using System.Collections.Generic;
using BusinesLogic;

namespace BuisnesLogicTests
{
	public class RouteCheckerTest
	{
		[Fact]
		public void TestCheckRoute_RoutesAreEqual_Return100Percents()
		{
			// Arrange
			var routeChecker = new RoutesChecker();
			var point1 = new Point(50.30, 50.40);
			var point2 = new Point(50.20, 30.23);
			var geomPoint1 = new Point(53.30, 50.40);
			var geomPoint2 = new Point(50.20, 31.23);
			var geomPoint3 = new Point(25.95, 67.39);
			var geomPoint4 = new Point(88.95, 67.39);
			var geometryPoints = new PointsArr(geomPoint3, geomPoint4);
			var geometryPoints2 = new PointsArr(geomPoint3, geomPoint4);
			var geometry = new GeometryArr(geomPoint1, geomPoint2, "kjhskdjhfik3", geometryPoints);
			var geometry2 = new GeometryArr(geomPoint1, geomPoint2, "kjhskdjhfik3", geometryPoints2);
			var driverRoute = new Route(point1, point2, geometry);
			var passangerRoute = new Route(point1, point2, geometry2);

			// Act
			var result = routeChecker.CheckRoute(driverRoute, passangerRoute);
			// Assert
			Assert.Equal(100, result);
		}

		[Fact]
		public void TestCheckRoute_RoutesAreDifferent_ReturnLessThen100Precents()
		{
			var routeChecker = new RoutesChecker();
			var point1 = new Point(50.30, 50.40);
			var point2 = new Point(50.20, 30.23);
			var point3 = new Point(37.92, 73.95);
			var point4 = new Point(28.95, 83.39);
			var geomPoint1 = new Point(53.30, 50.40);
			var geomPoint2 = new Point(50.20, 31.23);
			var geomPoint3 = new Point(32.92, 73.95);
			var geomPoint4 = new Point(28.95, 67.39);
			var geomPoint5 = new Point(58.95, 67.39);
			var geomPoint6 = new Point(38.95, 67.39);
			var geomPoint7 = new Point(25.95, 67.39);
			var geomPoint8 = new Point(88.95, 67.39);
			var geometryPoints = new PointsArr(geomPoint5, geomPoint6);
			var geometryPoints2 = new PointsArr(geomPoint7, geomPoint8);
			var geometry = new GeometryArr(geomPoint1, geomPoint2, "kjhskdjhfik3", geometryPoints);
			var geometry2 = new GeometryArr(geomPoint3, geomPoint4, "kdhkkekknqkj12", geometryPoints2);
			var driverRoute = new Route(point1, point2, geometry);
			var passangerRoute = new Route(point3, point4, geometry2);

			var result = routeChecker.CheckRoute(driverRoute, passangerRoute);

			Assert.True(result < 100);
		}


	}
	public class DecodeCheckerTest
	{
		[Fact]
		public void TestCheckDecode_DecodesAreSame_ReturnTrue()
		{
			var expectedResult = new List<Location>
			{
				new Location(50.27121,30.44296),
				new Location(50.27140,30.44359),
				new Location(50.27173,30.44464),
				new Location(50.27190,30.44518),
				new Location(50.27217,30.44578),
				new Location(50.27247,30.44641),
				new Location(50.27267,30.44692),
				new Location(50.27287,30.44734),
				new Location(50.27295,30.44750)
			};
			var pointRes = GooglePolylineConverter.Decode("aryqHo{xxDe@}BaAqEa@kBu@wB{@}Bg@eBg@sAO_@").ToList();
			//var result = decodeChecker.CheckDecode(pointRes, expectedResult);
			Assert.Equal(expectedResult, pointRes);
		}
	}
}