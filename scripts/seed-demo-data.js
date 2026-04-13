#!/usr/bin/env node

/**
 * Demo data seeder for Guest Messages feature
 * Adds sample messages for testing the display and functionality
 */

import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const sampleMessages = [
  { name: "Rajesh & Priya", message: "Wishing you both a lifetime of love and happiness! Can't wait to celebrate with you! 💕" },
  { name: "Amit Kumar", message: "So excited for your special day! You two are perfect for each other. Congratulations! 🎉" },
  { name: "Sneha Sharma", message: "Your love story is so inspiring! Wishing you endless joy and countless adventures together! ✨" },
  { name: "Vikram & Family", message: "May your marriage be filled with laughter, love, and beautiful memories. Congratulations! 🥳" },
  { name: "Anita Devi", message: "Two hearts becoming one! So happy for you both. May God bless your union with love and happiness! 🙏" },
  { name: "Rohit Gupta", message: "From friends to soulmates - your journey has been beautiful to watch. Congratulations on your wedding! 💐" },
  { name: "Kavita & Suresh", message: "Wishing you a wonderful wedding day and a lifetime of happiness together! Love you both! ❤️" },
  { name: "Deepak Singh", message: "May your love story continue to inspire us all. Congratulations and best wishes for your new journey! 🌟" }
];

async function seedDemoData() {
  const databaseUrl = process.env.NETLIFY_DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('❌ NETLIFY_DATABASE_URL environment variable is not set');
    console.log('Please set this variable with your Neon database connection string');
    process.exit(1);
  }

  try {
    console.log('🔌 Connecting to database...');
    const client = new Client({ connectionString: databaseUrl });
    await client.connect();
    
    console.log('🌱 Adding demo messages...');
    
    for (let i = 0; i < sampleMessages.length; i++) {
      const { name, message } = sampleMessages[i];
      await client.query(
        'INSERT INTO guest_messages (name, message) VALUES ($1, $2)',
        [name, message]
      );
      
      // Add a small delay to create different timestamps
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Get total count
    const countResult = await client.query('SELECT COUNT(*) as total FROM guest_messages');
    const total = parseInt(countResult.rows[0].total);
    
    console.log(`✅ Added ${sampleMessages.length} demo messages!`);
    console.log(`📊 Total messages in database: ${total}`);
    console.log('🎉 You can now test the guest messages feature on your website!');
    
    await client.end();
  } catch (error) {
    console.error('❌ Demo data seeding failed:', error);
    process.exit(1);
  }
}

seedDemoData();