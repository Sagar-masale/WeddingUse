import { Handler } from '@netlify/functions';

const handler: Handler = async (event) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
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

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Get database connection from environment variable
    const databaseUrl = process.env.NETLIFY_DATABASE_URL;
    
    if (!databaseUrl) {
      // Return empty messages when database is not configured (dev mode)
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ messages: [], success: true }),
      };
    }

    // Import pg for database connection
    const { Client } = require('pg');
    const client = new Client({ connectionString: databaseUrl });
    
    await client.connect();
    
    // Fetch messages from database, ordered by creation date
    const result = await client.query(
      'SELECT id, name, message, created_at FROM guest_messages ORDER BY created_at DESC LIMIT 50'
    );
    
    await client.end();
    
    const messages = result.rows.map(row => ({
      id: row.id.toString(),
      name: row.name,
      message: row.message,
      created_at: row.created_at
    }));
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        messages,
        success: true,
      }),
    };
  } catch (error) {
    console.error('Error fetching messages:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to fetch messages',
        success: false 
      }),
    };
  }
};

export { handler };