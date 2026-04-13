const handler = async (event) => {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  // Allow only GET
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const databaseUrl = process.env.NETLIFY_DATABASE_URL;

    // If DB not configured
    if (!databaseUrl) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ messages: [], success: true }),
      };
    }

    // Connect to DB
    const { Client } = require("pg");
    const client = new Client({ connectionString: databaseUrl });

    await client.connect();

    const result = await client.query(
      "SELECT id, name, message, created_at FROM guest_messages ORDER BY created_at DESC LIMIT 50"
    );

    await client.end();

    const messages = result.rows.map((row) => ({
      id: row.id.toString(),
      name: row.name,
      message: row.message,
      created_at: row.created_at,
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
    console.error("Error fetching messages:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Failed to fetch messages",
        success: false,
      }),
    };
  }
};

module.exports = { handler };