using API.Errors;
using API.Infrastructure.DataContext;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BugyController : BaseApiController
    {
        private readonly StoreContext _context;

        public BugyController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet("notfound")]
        public ActionResult GetNotFoundRequest()
        {
            var product = _context.Products.Find(5);
            if (product==null)
            {
                return NotFound(new ApiResponse(404));
            }
            return Ok();
        }

        [HttpGet("servererror")]
        public ActionResult GetServerError()
        {
            var product = _context.Products.Find(5);
            var productToReturn = product.ToString()
  ;            return Ok();
        }

        [HttpGet("badRequest")]
        public ActionResult GetBadRequest()
        {
           return BadRequest(new ApiResponse(400));
        }
        [HttpGet("badRequest/{id}")]
        public ActionResult GetFoundBadRequest(int id)
        {
            return Ok();
        }

    }
}
