# 📧 Email Setup Guide for SureShop

This guide will help you set up real email functionality for your SureShop e-commerce website.

## 🚀 Quick Setup Options

### Option 1: Gmail SMTP (Recommended for Development)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. **Update `EcommerceApi/appsettings.json`**:
   ```json
   {
     "EmailSettings": {
       "SmtpHost": "smtp.gmail.com",
       "SmtpPort": "587",
       "Username": "your-email@gmail.com",
       "Password": "your-16-character-app-password",
       "FromEmail": "your-email@gmail.com",
       "FromName": "SureShop"
     }
   }
   ```

### Option 2: SendGrid (Recommended for Production)

1. **Sign up for SendGrid** (free tier: 100 emails/day)
2. **Create an API Key** in SendGrid dashboard
3. **Update `EcommerceApi/appsettings.json`**:
   ```json
   {
     "EmailSettings": {
       "SmtpHost": "smtp.sendgrid.net",
       "SmtpPort": "587",
       "Username": "apikey",
       "Password": "your-sendgrid-api-key",
       "FromEmail": "noreply@sureshop.com",
       "FromName": "SureShop"
     }
   }
   ```

### Option 3: Mailgun (Production Alternative)

1. **Sign up for Mailgun** (free tier: 10,000 emails/month)
2. **Get SMTP credentials** from Mailgun dashboard
3. **Update `EcommerceApi/appsettings.json`**:
   ```json
   {
     "EmailSettings": {
       "SmtpHost": "smtp.mailgun.org",
       "SmtpPort": "587",
       "Username": "your-mailgun-smtp-username",
       "Password": "your-mailgun-smtp-password",
       "FromEmail": "noreply@sureshop.com",
       "FromName": "SureShop"
     }
   }
   ```

## 🔧 Configuration Steps

### 1. Update Email Settings

Edit `EcommerceApi/appsettings.json` with your email provider details:

```json
{
  "EmailSettings": {
    "SmtpHost": "your-smtp-host",
    "SmtpPort": "587",
    "Username": "your-username",
    "Password": "your-password",
    "FromEmail": "noreply@sureshop.com",
    "FromName": "SureShop"
  }
}
```

### 2. Test Email Functionality

1. **Start the backend**:
   ```bash
   cd EcommerceApi
   dotnet run
   ```

2. **Test newsletter subscription**:
   - Go to your website footer
   - Enter your email address
   - Click "Subscribe"
   - Check your email for the welcome message

### 3. Verify Email Delivery

- Check your inbox for the welcome email
- Check spam/junk folder if not received
- Verify the email contains proper HTML formatting

## 📧 Email Templates Included

### 1. Welcome Email
- Sent when users subscribe to newsletter
- Includes welcome message and benefits
- Professional HTML design

### 2. Order Confirmation
- Sent when orders are placed
- Includes order details and tracking info
- Professional receipt format

### 3. Password Reset
- Sent when users request password reset
- Includes secure reset link
- Security-focused design

### 4. Newsletter
- Template for regular newsletters
- Responsive design
- Easy to customize

## 🛠️ Advanced Configuration

### Environment Variables (Production)

For production deployment, use environment variables instead of appsettings.json:

```bash
export EmailSettings__SmtpHost="smtp.sendgrid.net"
export EmailSettings__SmtpPort="587"
export EmailSettings__Username="apikey"
export EmailSettings__Password="your-api-key"
export EmailSettings__FromEmail="noreply@sureshop.com"
export EmailSettings__FromName="SureShop"
```

### Custom Email Templates

To customize email templates, edit the methods in `EcommerceApi/Services/EmailService.cs`:

- `GetWelcomeEmailTemplate()`
- `GetNewsletterEmailTemplate()`
- `GetOrderConfirmationTemplate()`
- `GetPasswordResetTemplate()`

## 🔍 Troubleshooting

### Common Issues

1. **"Authentication failed"**
   - Check username/password
   - Ensure 2FA is enabled for Gmail
   - Use app password, not regular password

2. **"Connection timeout"**
   - Check SMTP host and port
   - Verify firewall settings
   - Try different port (465 for SSL)

3. **"Emails not received"**
   - Check spam/junk folder
   - Verify sender email is not blocked
   - Test with different email providers

### Testing Commands

```bash
# Test SMTP connection
telnet smtp.gmail.com 587

# Check email logs
# Look in console output for email sending logs
```

## 📊 Email Analytics (Optional)

For advanced email tracking, consider integrating:

- **SendGrid Analytics**: Open rates, click tracking
- **Mailgun Analytics**: Delivery statistics
- **Google Analytics**: Email campaign tracking

## 🚀 Production Deployment

### Vercel Deployment
1. Set environment variables in Vercel dashboard
2. Update `VITE_API_URL` to your production API
3. Ensure email settings are configured

### Docker Deployment
```dockerfile
# Add to Dockerfile
ENV EmailSettings__SmtpHost="your-host"
ENV EmailSettings__Username="your-username"
ENV EmailSettings__Password="your-password"
```

## 📞 Support

If you need help with email setup:

1. Check the console logs for error messages
2. Verify your email provider's documentation
3. Test with a simple email first
4. Contact support if issues persist

## 🎉 Success!

Once configured, your newsletter subscription will:
- ✅ Send real welcome emails
- ✅ Handle subscription confirmations
- ✅ Provide professional email templates
- ✅ Support multiple email providers
- ✅ Work in production environments

Your users will now receive actual emails when they subscribe to your newsletter! 🎊
