#!/usr/bin/env node

/**
 * Local test for the guest messages functionality
 * This script tests the database operations without requiring Netlify functions to be running
 */

import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';

dotenv.config();

async function testSubmitMessage(name, message) {
  const databaseUrl = process.env.NETLIFY_DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('❌ NETLIFY_DATABASE_URL not found');
    return;
  }

  try {
    console.log(`📝 Submitting message from ${name}...`);
    const client = new Client({ connectionString: databaseUrl });
    await client.connect();

    // Insert new message
    const insertResult = await client.query(
      'INSERT INTO guest_messages (name, message) VALUES ($1, $2) RETURNING id, created_at',
      [name.trim(), message.trim()]
    );

    const newMessageId = insertResult.rows[0].id;
    
    // Get total message count
    const countResult = await client.query('SELECT COUNT(*) as total FROM guest_messages');
    const totalMessages = parseInt(countResult.rows[0].total);

    console.log(`✅ Message added! ID: ${newMessageId}`);
    console.log(`📊 Total messages: ${totalMessages}`);

    // Check if we need to send WhatsApp notification (every 5 messages)
    if (totalMessages % 5 === 0) {
      console.log(`🎉 WhatsApp notification would be triggered! (${totalMessages} messages)`);
      
      // Get the latest 5 messages for bulk notification
      const latestResult = await client.query(
        'SELECT id, name, message, created_at FROM guest_messages ORDER BY created_at DESC LIMIT 5'
      );
      
      const latestMessages = latestResult.rows;
      
      console.log('📱 WhatsApp message would contain:');
      console.log('💒 New Wedding Messages! 💒\n');
      
      latestMessages.reverse().forEach((msg, index) => {
        console.log(`${index + 1}. *${msg.name}*: "${msg.message}"`);
      });
      
      console.log(`\n🎉 Total messages: ${totalMessages}`);
      
      // Test WhatsApp sending (if credentials are available)
      await testWhatsAppNotification(latestMessages, totalMessages);
    }

    await client.end();
    return { success: true, id: newMessageId, total: totalMessages };
  } catch (error) {
    console.error('❌ Error:', error.message);
    return { success: false, error: error.message };
  }
}

async function testWhatsAppNotification(messages, totalMessages) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromWhatsApp = process.env.TWILIO_WHATSAPP_FROM;
  const toWhatsApp = process.env.BRIDE_GROOM_WHATSAPP;

  if (!accountSid || !authToken || !fromWhatsApp || !toWhatsApp) {
    console.log('⚠️  WhatsApp notification skipped - Twilio credentials not complete');
    console.log('Required: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM, BRIDE_GROOM_WHATSAPP');
    return;
  }

  try {
    console.log('📱 Testing WhatsApp notification...');
    
    // Dynamic import for twilio
    const twilio = (await import('twilio')).default;
    const client = twilio(accountSid, authToken);
    
    // Format the bulk message
    let bulkMessage = '💒 New Wedding Messages! 💒\n\n';
    messages.forEach((msg, index) => {
      bulkMessage += `${index + 1}. *${msg.name}*: "${msg.message}"\n\n`;
    });
    bulkMessage += `🎉 Total messages: ${totalMessages}`;

    await client.messages.create({
      body: bulkMessage,
      from: fromWhatsApp,
      to: toWhatsApp,
    });

    console.log('✅ WhatsApp notification sent successfully!');
  } catch (error) {
    console.error('❌ WhatsApp notification failed:', error.message);
  }
}

// Test with sample messages
async function runTest() {
  console.log('🧪 Starting Guest Messages Test\n');
  
  // Test messages to reach the next notification threshold
  const testMessages = [
    { name: "Test User 1", message: "Testing the guest message feature! This is so cool!" },
    { name: "Test User 2", message: "Can't wait for your special day! Love you both!" }
  ];
  
  for (let i = 0; i < testMessages.length; i++) {
    const { name, message } = testMessages[i];
    const result = await testSubmitMessage(name, message);
    
    if (!result.success) {
      console.error(`Failed to submit message ${i + 1}`);
      break;
    }
    
    console.log('---');
    
    // Small delay between messages
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('🎉 Test completed!');
}

runTest();