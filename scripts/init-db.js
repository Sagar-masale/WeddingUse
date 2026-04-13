#!/usr/bin/env node

/**
 * Database initialization script for Guest Messages feature
 * Run this script to set up the database schema in your Neon Postgres database
 */

import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const schema = `
-- Create the guest_messages table
CREATE TABLE IF NOT EXISTS guest_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  message TEXT NOT NULL CHECK (LENGTH(message) <= 300),
  guest_email VARCHAR(254),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_notified BOOLEAN DEFAULT FALSE,
  email_sent BOOLEAN DEFAULT FALSE
);

-- Add missing columns for existing databases
ALTER TABLE guest_messages
  ADD COLUMN IF NOT EXISTS guest_email VARCHAR(254),
  ADD COLUMN IF NOT EXISTS email_sent BOOLEAN DEFAULT FALSE;

-- Create an index on created_at for efficient ordering
CREATE INDEX IF NOT EXISTS idx_guest_messages_created_at ON guest_messages(created_at DESC);

-- Create a table to track notification status
CREATE TABLE IF NOT EXISTS notification_status (
  id SERIAL PRIMARY KEY,
  last_notification_sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  messages_sent_count INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial notification status record
INSERT INTO notification_status (messages_sent_count) 
VALUES (0) 
ON CONFLICT DO NOTHING;
`;

async function initializeDatabase() {
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
    
    console.log('🗃️ Creating database schema...');
    await client.query(schema);
    
    console.log('✅ Database initialized successfully!');
    console.log('📊 Tables created:');
    console.log('   - guest_messages: Stores guest messages + emails');
    console.log('   - notification_status: Tracks WhatsApp notifications');
    
    await client.end();
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

initializeDatabase();