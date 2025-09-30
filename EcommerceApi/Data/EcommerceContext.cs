using Microsoft.EntityFrameworkCore;
using EcommerceApi.Models;

namespace EcommerceApi.Data;

public class EcommerceContext : DbContext
{
    public EcommerceContext(DbContextOptions<EcommerceContext> options) : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }
    public DbSet<CartItem> CartItems { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed data
        modelBuilder.Entity<Product>().HasData(
            new Product
            {
                Id = 1,
                Name = "Wireless Headphones",
                Description = "High-quality wireless headphones with noise cancellation",
                Price = 199.99m,
                ImageUrl = "/images/headphones.jpg",
                Category = "Electronics",
                Stock = 50
            },
            new Product
            {
                Id = 2,
                Name = "Smart Watch",
                Description = "Feature-rich smartwatch with health monitoring",
                Price = 299.99m,
                ImageUrl = "/images/smartwatch.jpg",
                Category = "Electronics",
                Stock = 30
            },
            new Product
            {
                Id = 3,
                Name = "Laptop Stand",
                Description = "Adjustable laptop stand for better ergonomics",
                Price = 49.99m,
                ImageUrl = "/images/laptop-stand.jpg",
                Category = "Accessories",
                Stock = 100
            }
        );
    }
}
