using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcommerceApi.Data;
using EcommerceApi.Models;

namespace EcommerceApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly EcommerceContext _context;

    public OrdersController(EcommerceContext context)
    {
        _context = context;
    }

    [HttpGet("{userId}")]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrders(string userId)
    {
        return await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .Where(o => o.UserId == userId)
            .ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(Order order)
    {
        // Generate unique order number
        order.OrderNumber = $"SP-{DateTime.UtcNow:yyyy}-{order.Id:D6}";
        
        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetOrders", new { userId = order.UserId }, order);
    }

    [HttpGet("track")]
    public async Task<ActionResult<Order>> TrackOrder([FromQuery] string? orderNumber, [FromQuery] string? email, [FromQuery] string? trackingNumber)
    {
        Order? order = null;

        if (!string.IsNullOrEmpty(orderNumber) && !string.IsNullOrEmpty(email))
        {
            // Search by order number and email
            order = await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .Include(o => o.TrackingEvents)
                .FirstOrDefaultAsync(o => o.OrderNumber == orderNumber && o.Email.ToLower() == email.ToLower());
        }
        else if (!string.IsNullOrEmpty(trackingNumber))
        {
            // Search by tracking number
            order = await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .Include(o => o.TrackingEvents)
                .FirstOrDefaultAsync(o => o.TrackingNumber == trackingNumber);
        }

        if (order == null)
        {
            return NotFound(new { message = "Order not found" });
        }

        return order;
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateOrder(int id, Order order)
    {
        if (id != order.Id)
        {
            return BadRequest();
        }

        _context.Entry(order).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!OrderExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    private bool OrderExists(int id)
    {
        return _context.Orders.Any(e => e.Id == id);
    }
}
