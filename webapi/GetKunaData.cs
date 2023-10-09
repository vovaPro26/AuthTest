using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Data;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json.Serialization;

namespace webapi
{
	public class DataRes
	{
		public List<GetKunaDataResponce> Data { get; set; }
	}
	public class GetKunaDataResponce
	{
		public string Pair { get; set; }
		public string PercentagePriceChange { get; set; }
		public string Price { get; set; }
		public string EquivalentPrice { get; set; }
		public string High { get; set; }
		public string Low { get; set; }
		public string BaseVolume { get; set; }
		public string QuoteVolume { get; set; }
		public string BestBidPrice { get; set; }
		public string BestAskPrice { get; set; }
		public string PriceChange { get; set; }
	}
	public static class GetKunaData
	{
		public static WebApplication GetData(this WebApplication app)
		{
			app.MapGet("/api/data", [Authorize(Roles = "User")] async (IHttpClientFactory httpClientFactory) =>
			{
				HttpClient _httpClient;
				_httpClient = httpClientFactory.CreateClient();
				var res = await _httpClient.GetFromJsonAsync<DataRes>("https://api.kuna.io/v4/markets/public/tickers?pairs=BTC_UAH,BTC_USDT");
				//var kuna = res.Content.ReadAsStringAsync();
				return Result.Ok();
			});
			return app;
		}
	}
}
