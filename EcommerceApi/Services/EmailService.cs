using System.Net;
using System.Net.Mail;
using System.Text;

namespace EcommerceApi.Services;

public interface IEmailService
{
    Task<bool> SendWelcomeEmailAsync(string email, string name = null);
    Task<bool> SendNewsletterEmailAsync(string email, string subject, string content);
    Task<bool> SendOrderConfirmationAsync(string email, string orderNumber, decimal total);
    Task<bool> SendPasswordResetEmailAsync(string email, string resetToken);
}

public class EmailService : IEmailService
{
    private readonly ILogger<EmailService> _logger;
    private readonly IConfiguration _configuration;

    public EmailService(ILogger<EmailService> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;
    }

    public async Task<bool> SendWelcomeEmailAsync(string email, string name = null)
    {
        try
        {
            var subject = "Welcome to SureShop! 🎉";
            var body = GetWelcomeEmailTemplate(name ?? "Valued Customer");
            
            return await SendEmailAsync(email, subject, body);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending welcome email to {Email}", email);
            return false;
        }
    }

    public async Task<bool> SendNewsletterEmailAsync(string email, string subject, string content)
    {
        try
        {
            var body = GetNewsletterEmailTemplate(content);
            return await SendEmailAsync(email, subject, body);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending newsletter email to {Email}", email);
            return false;
        }
    }

    public async Task<bool> SendOrderConfirmationAsync(string email, string orderNumber, decimal total)
    {
        try
        {
            var subject = $"Order Confirmation - {orderNumber}";
            var body = GetOrderConfirmationTemplate(orderNumber, total);
            
            return await SendEmailAsync(email, subject, body);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending order confirmation to {Email}", email);
            return false;
        }
    }

    public async Task<bool> SendPasswordResetEmailAsync(string email, string resetToken)
    {
        try
        {
            var subject = "Password Reset - SureShop";
            var body = GetPasswordResetTemplate(resetToken);
            
            return await SendEmailAsync(email, subject, body);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending password reset email to {Email}", email);
            return false;
        }
    }

    private async Task<bool> SendEmailAsync(string to, string subject, string body)
    {
        try
        {
            // In production, you would configure these in appsettings.json
            var smtpHost = _configuration["EmailSettings:SmtpHost"] ?? "smtp.gmail.com";
            var smtpPort = int.Parse(_configuration["EmailSettings:SmtpPort"] ?? "587");
            var smtpUsername = _configuration["EmailSettings:Username"] ?? "";
            var smtpPassword = _configuration["EmailSettings:Password"] ?? "";
            var fromEmail = _configuration["EmailSettings:FromEmail"] ?? "noreply@sureshop.com";
            var fromName = _configuration["EmailSettings:FromName"] ?? "SureShop";

            using var client = new SmtpClient(smtpHost, smtpPort);
            client.EnableSsl = true;
            client.Credentials = new NetworkCredential(smtpUsername, smtpPassword);

            using var message = new MailMessage();
            message.From = new MailAddress(fromEmail, fromName);
            message.To.Add(to);
            message.Subject = subject;
            message.Body = body;
            message.IsBodyHtml = true;
            message.BodyEncoding = Encoding.UTF8;

            await client.SendMailAsync(message);
            
            _logger.LogInformation("Email sent successfully to {Email}", to);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send email to {Email}", to);
            return false;
        }
    }

    private string GetWelcomeEmailTemplate(string name)
    {
        return $@"
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <title>Welcome to SureShop</title>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
        .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
        .button {{ display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }}
        .footer {{ text-align: center; margin-top: 30px; color: #666; font-size: 14px; }}
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>🎉 Welcome to SureShop!</h1>
        </div>
        <div class='content'>
            <h2>Hello {name}!</h2>
            <p>Thank you for subscribing to our newsletter! We're excited to have you as part of the SureShop family.</p>
            
            <p>As a subscriber, you'll receive:</p>
            <ul>
                <li>✨ Exclusive deals and discounts</li>
                <li>🛍️ New product announcements</li>
                <li>📧 Weekly shopping tips</li>
                <li>🎁 Special member-only offers</li>
            </ul>
            
            <p>Ready to start shopping? Check out our latest products and exclusive deals!</p>
            
            <a href='#' class='button'>Start Shopping Now</a>
            
            <p>If you have any questions, feel free to contact our support team. We're here to help!</p>
            
            <p>Happy Shopping!<br>The SureShop Team</p>
        </div>
        <div class='footer'>
            <p>© 2024 SureShop. All rights reserved.</p>
            <p>You received this email because you subscribed to our newsletter.</p>
        </div>
    </div>
</body>
</html>";
    }

    private string GetNewsletterEmailTemplate(string content)
    {
        return $@"
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <title>SureShop Newsletter</title>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
        .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
        .footer {{ text-align: center; margin-top: 30px; color: #666; font-size: 14px; }}
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>📧 SureShop Newsletter</h1>
        </div>
        <div class='content'>
            {content}
        </div>
        <div class='footer'>
            <p>© 2024 SureShop. All rights reserved.</p>
            <p><a href='#'>Unsubscribe</a> | <a href='#'>Update Preferences</a></p>
        </div>
    </div>
</body>
</html>";
    }

    private string GetOrderConfirmationTemplate(string orderNumber, decimal total)
    {
        return $@"
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <title>Order Confirmation - SureShop</title>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
        .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
        .order-details {{ background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }}
        .footer {{ text-align: center; margin-top: 30px; color: #666; font-size: 14px; }}
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>✅ Order Confirmed!</h1>
        </div>
        <div class='content'>
            <h2>Thank you for your order!</h2>
            <p>We've received your order and are preparing it for shipment.</p>
            
            <div class='order-details'>
                <h3>Order Details</h3>
                <p><strong>Order Number:</strong> {orderNumber}</p>
                <p><strong>Total Amount:</strong> ${total:F2}</p>
                <p><strong>Order Date:</strong> {DateTime.Now:MMMM dd, yyyy}</p>
            </div>
            
            <p>You'll receive a shipping confirmation email once your order is on its way.</p>
            <p>Thank you for choosing SureShop!</p>
        </div>
        <div class='footer'>
            <p>© 2024 SureShop. All rights reserved.</p>
        </div>
    </div>
</body>
</html>";
    }

    private string GetPasswordResetTemplate(string resetToken)
    {
        return $@"
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <title>Password Reset - SureShop</title>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
        .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
        .button {{ display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }}
        .footer {{ text-align: center; margin-top: 30px; color: #666; font-size: 14px; }}
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>🔐 Password Reset</h1>
        </div>
        <div class='content'>
            <h2>Reset Your Password</h2>
            <p>We received a request to reset your password for your SureShop account.</p>
            <p>Click the button below to reset your password:</p>
            
            <a href='#' class='button'>Reset Password</a>
            
            <p>If you didn't request this password reset, please ignore this email.</p>
            <p>This link will expire in 24 hours for security reasons.</p>
        </div>
        <div class='footer'>
            <p>© 2024 SureShop. All rights reserved.</p>
        </div>
    </div>
</body>
</html>";
    }
}
