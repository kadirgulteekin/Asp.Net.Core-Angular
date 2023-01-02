using API.Core.DbModels;
using API.Core.Interface;
using StackExchange.Redis;
using System.Text.Json;

namespace API.Infrastructure.Implemenents
{
    public class BasketRepository : IBasketRepository
    {

        private readonly IDatabase database;


        public BasketRepository(IDatabase redis)

        {

            this.database = redis;

        }
        //private readonly IDatabase _database;
        //public BasketRepository(IConnectionMultiplexer redis)
        //{
        //    _database = redis.GetDatabase();
        //}
        public async Task<bool> DeleteBasketAsync(string basketId)
        {
            return await database.KeyDeleteAsync(basketId);
        }

        public async Task<CustomerBasket> GetBasketAsync(string basketId)
        {
          var data = await database.StringGetAsync(basketId);
            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerBasket>(data);
        }

     

        public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket)
        {
            var created = await database.StringSetAsync(basket.Id,JsonSerializer.Serialize(basket),TimeSpan.FromDays(30));
            if (!created)
                return null;
            return await GetBasketAsync(basket.Id);

       
        }
    }
}
