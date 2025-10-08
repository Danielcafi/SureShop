using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using EcommerceApi.Services;

namespace EcommerceApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NewsletterController : ControllerBase
{
    private readonly ILogger<NewsletterController> _logger;
    private readonly IEmailService _emailService;

    public NewsletterController(ILogger<NewsletterController> logger, IEmailService emailService)
    {
        _logger = logger;
        _emailService = emailService;
    }

    [HttpPost("subscribe")]
    public async Task<ActionResult> Subscribe([FromBody] NewsletterSubscriptionRequest request)
    {
        try
        {
            if (!IsValidEmail(request.Email))
            {
                return BadRequest(new { message = "Please provide a valid email address." });
            }

            // In a real implementation, you would:
            // 1. Save to database
            // 2. Send confirmation email
            // 3. Add to email marketing service (Mailchimp, SendGrid, etc.)

            _logger.LogInformation($"Newsletter subscription request for email: {request.Email}");

            // Send welcome email
            var emailSent = await _emailService.SendWelcomeEmailAsync(request.Email);
            
            if (emailSent)
            {
                _logger.LogInformation($"Welcome email sent successfully to: {request.Email}");
            }
            else
            {
                _logger.LogWarning($"Failed to send welcome email to: {request.Email}");
            }

            return Ok(new
            {
                success = true,
                message = emailSent ? 
                    "Successfully subscribed to newsletter! Check your email for a welcome message." : 
                    "Successfully subscribed to newsletter! (Email delivery may be delayed)",
                subscription = new
                {
                    email = request.Email,
                    subscribedAt = DateTime.UtcNow,
                    isActive = true
                }
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing newsletter subscription");
            return StatusCode(500, new { message = "An error occurred while processing your subscription." });
        }
    }

    [HttpPost("unsubscribe")]
    public async Task<ActionResult> Unsubscribe([FromBody] NewsletterSubscriptionRequest request)
    {
        try
        {
            if (!IsValidEmail(request.Email))
            {
                return BadRequest(new { message = "Please provide a valid email address." });
            }

            _logger.LogInformation($"Newsletter unsubscription request for email: {request.Email}");

            // In a real implementation, you would:
            // 1. Update database record
            // 2. Remove from email marketing service
            // 3. Send confirmation email

            return Ok(new
            {
                success = true,
                message = "Successfully unsubscribed from newsletter."
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing newsletter unsubscription");
            return StatusCode(500, new { message = "An error occurred while processing your unsubscription." });
        }
    }

    [HttpGet("status")]
    public ActionResult GetSubscriptionStatus([FromQuery] string email)
    {
        try
        {
            if (!IsValidEmail(email))
            {
                return BadRequest(new { message = "Please provide a valid email address." });
            }

            // In a real implementation, you would check the database
            // For now, we'll simulate a check
            var isSubscribed = true; // This would come from database

            return Ok(new
            {
                isSubscribed,
                subscription = isSubscribed ? new
                {
                    email,
                    subscribedAt = DateTime.UtcNow.AddDays(-30), // Simulated
                    isActive = true
                } : null
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error checking subscription status");
            return StatusCode(500, new { message = "An error occurred while checking subscription status." });
        }
    }

    private bool IsValidEmail(string email)
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

public class NewsletterSubscriptionRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
}
