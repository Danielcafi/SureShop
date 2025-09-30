using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcommerceApi.Data;
using EcommerceApi.Models;

namespace EcommerceApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly EcommerceContext _context;

    public CartController(EcommerceContext context)
    {
        _context = context;
    }

    [HttpGet("{userId}")]
    public async Task<ActionResult<IEnumerable<CartItem>>> GetCartItems(string userId)
    {
        return await _context.CartItems
            .Include(ci => ci.Product)
            .Where(ci => ci.UserId == userId)
            .ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<CartItem>> AddToCart(CartItem cartItem)
    {
        var existingItem = await _context.CartItems
            .FirstOrDefaultAsync(ci => ci.ProductId == cartItem.ProductId && ci.UserId == cartItem.UserId);

        if (existingItem != null)
        {
            existingItem.Quantity += cartItem.Quantity;
        }
        else
        {
            _context.CartItems.Add(cartItem);
        }

        await _context.SaveChangesAsync();
        return CreatedAtAction("GetCartItems", new { userId = cartItem.UserId }, cartItem);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCartItem(int id, CartItem cartItem)
    {
        if (id != cartItem.Id)
        {
            return BadRequest();
        }

        _context.Entry(cartItem).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!CartItemExists(id))
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

    [HttpDelete("{id}")]
    public async Task<IActionResult> RemoveFromCart(int id)
    {
        var cartItem = await _context.CartItems.FindAsync(id);
        if (cartItem == null)
        {
            return NotFound();
        }

        _context.CartItems.Remove(cartItem);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("clear/{userId}")]
    public async Task<IActionResult> ClearCart(string userId)
    {
        var cartItems = await _context.CartItems
            .Where(ci => ci.UserId == userId)
            .ToListAsync();

        _context.CartItems.RemoveRange(cartItems);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool CartItemExists(int id)
    {
        return _context.CartItems.Any(e => e.Id == id);
    }
}
