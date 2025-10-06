using Microsoft.AspNetCore.Mvc;
using EcommerceApi.Models;

namespace EcommerceApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly ILogger<ContactController> _logger;

    public ContactController(ILogger<ContactController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    public async Task<ActionResult<ContactResponse>> SubmitContactForm([FromBody] ContactFormData formData)
    {
        try
        {
            // Validate the form data
            if (string.IsNullOrEmpty(formData.Name) || 
                string.IsNullOrEmpty(formData.Email) || 
                string.IsNullOrEmpty(formData.Subject) || 
                string.IsNullOrEmpty(formData.Message))
            {
                return BadRequest(new ContactResponse
                {
                    Success = false,
                    Message = "All fields are required."
                });
            }

            // Validate email format
            if (!IsValidEmail(formData.Email))
            {
                return BadRequest(new ContactResponse
                {
                    Success = false,
                    Message = "Please provide a valid email address."
                });
            }

            // Log the contact form submission
            _logger.LogInformation("Contact form submitted: {Name}, {Email}, {Subject}", 
                formData.Name, formData.Email, formData.Subject);

            // In a real application, you would:
            // 1. Save to database
            // 2. Send email notification
            // 3. Send auto-reply to customer
            // 4. Create support ticket

            // For now, we'll simulate processing
            await Task.Delay(1000); // Simulate processing time

            return Ok(new ContactResponse
            {
                Success = true,
                Message = "Thank you for your message! We'll get back to you within 24 hours.",
                Id = $"contact-{DateTime.UtcNow:yyyyMMddHHmmss}"
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing contact form submission");
            return StatusCode(500, new ContactResponse
            {
                Success = false,
                Message = "An error occurred while processing your request. Please try again later."
            });
        }
    }

    private static bool IsValidEmail(string email)
    {
        try
        {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == email;
        }
        catch
        {
            return false;
        }
    }
}

public class ContactFormData
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
}

public class ContactResponse
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public string? Id { get; set; }
}
