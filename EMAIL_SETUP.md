# Email Setup Guide

## Gmail Configuration

To enable email functionality for the contact form, you need to configure Gmail:

### 1. Enable 2-Factor Authentication
- Go to your Google Account settings
- Enable 2-Factor Authentication

### 2. Generate App Password
- Go to Google Account > Security > App passwords
- Generate a new app password for "Mail"
- Copy the 16-character password

### 3. Update Backend .env File
Replace the placeholder values in `backend/.env`:

```
EMAIL_USER=your_actual_gmail@gmail.com
EMAIL_PASS=your_16_character_app_password
```

### 4. Test the Setup
1. Start the backend server: `npm run dev` (in backend folder)
2. Start the frontend: `npm start` (in frontend folder)
3. Go to the contact section and send a test message
4. Check your email for the contact form message

## Alternative Email Services

You can also use other email services by updating the transporter configuration in `backend/routes/contact.js`:

### Outlook/Hotmail
```javascript
service: 'hotmail'
```

### Custom SMTP
```javascript
host: 'your-smtp-server.com',
port: 587,
secure: false
```

## Troubleshooting

- Make sure 2FA is enabled on your Gmail account
- Use App Password, not your regular Gmail password
- Check that the backend server is running on port 5000
- Verify the EMAIL_USER and EMAIL_PASS are correctly set in .env