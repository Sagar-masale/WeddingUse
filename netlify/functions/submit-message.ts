import { Handler } from '@netlify/functions';

interface RequestBody {
  name: string;
  message: string;
}

const handler: Handler = async (event) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse request body
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Request body is required' }),
      };
    }

    const { name, message }: RequestBody = JSON.parse(event.body);

    // Validate input
    if (!name || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Name and message are required' }),
      };
    }

    if (name.length > 50 || message.length > 300) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Name or message too long' }),
      };
    }

    // Get database connection
    const databaseUrl = "postgresql://postgres:Wedding%40Vinayak@db.xcdxjfaufmcfhmnubzzw.supabase.co:5432/postgres";
    
    if (!databaseUrl) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Database configuration missing' }),
      };
    }

    const { Client } = require('pg');
    const client = new Client({ connectionString: databaseUrl });
    
    await client.connect();

    // Insert new message into database (only name and message columns)
    const insertResult = await client.query(
      'INSERT INTO guest_messages (name, message) VALUES ($1, $2) RETURNING id, created_at',
      [name.trim(), message.trim()]
    );

    const newMessageId = insertResult.rows[0].id;
    const createdAt = insertResult.rows[0].created_at;

    const emailSent = await sendEmailNotification(name.trim(), message.trim());

    await client.end();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Message submitted successfully',
        id: newMessageId.toString(),
        emailSent,
      }),
    };
  } catch (error) {
    console.error('Error submitting message:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to submit message',
        success: false 
      }),
    };
  }
};

export { handler };