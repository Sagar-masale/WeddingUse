const handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  // OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  // Only POST allowed
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Request body is required" }),
      };
    }

    const { name, message } = JSON.parse(event.body);

    // Validation
    if (!name || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Name and message are required" }),
      };
    }

    if (name.length > 50 || message.length > 300) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Name or message too long" }),
      };
    }

    const databaseUrl = process.env.NETLIFY_DATABASE_URL;

    if (!databaseUrl) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Database configuration missing" }),
      };
    }

    const { Client } = require("pg");
    const client = new Client({ connectionString: databaseUrl });

    await client.connect();

    const insertResult = await client.query(
      "INSERT INTO guest_messages (name, message) VALUES ($1, $2) RETURNING id, created_at",
      [name.trim(), message.trim()]
    );

    const newMessageId = insertResult.rows[0].id;

    await client.end();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "Message submitted successfully",
        id: newMessageId.toString(),
      }),
    };
  } catch (error) {
  console.error("Error submitting message:", error);

  return {
    statusCode: 500,
    headers,
    body: JSON.stringify({
      error: error.message,  
      success: false,
    }),
  };
}
};

module.exports = { handler };