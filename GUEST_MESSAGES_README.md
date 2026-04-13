# Guest Messages Feature 💌

A beautiful guest message wall feature for your wedding website that allows visitors to leave heartfelt messages. Messages are displayed as animated bubbles and automatically sent to the bride/groom's WhatsApp in bulk (every 5 messages).

## ✨ Features

- 📝 **Guest Message Form**: Beautiful form for visitors to submit name and message
- 🎈 **Animated Bubbles**: Messages display as animated bubbles that cycle through
- 📱 **WhatsApp Notifications**: Bulk notifications sent every 5 messages via Twilio
- 🗄️ **Database Storage**: Messages stored in Neon Postgres database
- 🎨 **Beautiful UI**: Rose-themed design matching wedding aesthetics
- 📊 **Message Counter**: Shows total number of messages received
- ⚡ **Serverless**: Uses Netlify Functions for backend API

## 🚀 Setup Instructions

### 1. Database Setup (Neon)

Your Netlify project already has a Neon database configured. To set up the required tables:

```bash
# Make sure NETLIFY_DATABASE_URL is set in your environment
npm run init-db
```

### 2. Environment Variables

Copy the example environment file and configure:

```bash
cp .env.example .env.local
```

Configure these variables in both your local `.env.local` and Netlify dashboard:

```env
# Neon Database (auto-configured in Netlify)
NETLIFY_DATABASE_URL="your_neon_db_connection_string"

# Twilio WhatsApp API
TWILIO_ACCOUNT_SID="your_twilio_account_sid"
TWILIO_AUTH_TOKEN="your_twilio_auth_token"
TWILIO_WHATSAPP_FROM="whatsapp:+14155238886"  # Twilio sandbox number

# WhatsApp number to receive notifications
BRIDE_GROOM_WHATSAPP="whatsapp:+1234567890"  # Your WhatsApp number
```

### 3. Twilio WhatsApp Setup

1. **Create Twilio Account**: Sign up at [twilio.com](https://twilio.com)
2. **WhatsApp Sandbox**: Go to Console → Messaging → Try it out → Send a WhatsApp message
3. **Join Sandbox**: Send "join [sandbox-code]" to the Twilio WhatsApp number from your phone
4. **Get Credentials**: Copy Account SID and Auth Token from your console
5. **Configure Numbers**: Set up your Twilio sandbox number and target WhatsApp number

### 4. Netlify Deployment

1. **Environment Variables**: Add all environment variables in Netlify dashboard (Site settings → Environment variables)
2. **Database Connection**: Your Neon database should be auto-connected via `NETLIFY_DATABASE_URL`
3. **Deploy**: Push to your repository, Netlify will auto-deploy

## 🏗️ Project Structure

```
src/
└── components/
    └── GuestMessages.tsx          # Main component with form and bubbles

netlify/
└── functions/
    ├── get-messages.ts            # API to fetch messages
    └── submit-message.ts          # API to submit new messages

scripts/
└── init-db.js                    # Database initialization script

database/
└── schema.sql                    # Database schema
```

## 📋 Database Schema

### `guest_messages` Table
- `id`: Primary key
- `name`: Guest name (max 50 chars)
- `message`: Message text (max 300 chars)  
- `created_at`: Timestamp
- `is_notified`: Notification tracking

### `notification_status` Table  
- `id`: Primary key
- `last_notification_sent_at`: Last WhatsApp notification time
- `messages_sent_count`: Total messages when last notification sent
- `updated_at`: Last update time

## 🔔 WhatsApp Notification Logic

- **Bulk Notifications**: Sent every 5 new messages
- **Message Format**: Includes names, messages, and total count
- **Rate Limiting**: Reduces Twilio API usage for free tier
- **Error Handling**: Graceful failure if WhatsApp setup is incomplete

## 🎨 UI Components Used

- **Form**: Input and Textarea from shadcn/ui
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React (MessageCircle, Send, User, Heart)
- **Notifications**: Sonner for toast messages
- **Styling**: Tailwind CSS with rose color theme

## 📱 Mobile Responsive

The component is fully responsive and works beautifully on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Initialize database (make sure .env.local is configured)
npm run init-db

# Start development server
npm run dev

# The component will be available at the bottom of your homepage
```

## 🚨 Troubleshooting

### Messages not appearing?
- Check browser console for API errors
- Verify `NETLIFY_DATABASE_URL` is set correctly
- Run `npm run init-db` to ensure database schema is created

### WhatsApp notifications not working?
- Verify all Twilio environment variables are set
- Check that your phone number is added to Twilio WhatsApp sandbox
- Test with a small batch of 5 messages to trigger notification

### Database connection errors?
- Ensure your Neon database is active (not expired)
- Check the connection string format
- Verify the database user has proper permissions

## 🔐 Security Features

- Input validation (name max 50 chars, message max 300 chars)
- SQL injection protection using parameterized queries
- CORS headers configured for security
- Rate limiting recommended for production use

## 🎉 Usage

1. Visitors go to your wedding website
2. Scroll down to the "Guest Messages" section (above footer)
3. Click "Leave a Message" button
4. Fill in name and message, click "Send Message"  
5. Message appears in the cycling bubble display
6. Every 5 messages trigger a WhatsApp notification to the couple

Enjoy collecting beautiful messages from your wedding guests! 💕