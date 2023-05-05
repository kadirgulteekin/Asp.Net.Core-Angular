using API.Core.DbModels.OrderAggregate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace API.Core.SpecificCations
{
    public class OrdersWithItemsAndOrderingSpefication : BaseSpecification<Order>
    {
        public OrdersWithItemsAndOrderingSpefication(string email):base(o=>o.BuyerEmail == email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
            AddOrderByDescending(o => o.OrderDate);
        }

        public OrdersWithItemsAndOrderingSpefication(int id,string email) : base(o=>o.Id == id && o.BuyerEmail == email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
        }
    }
}
