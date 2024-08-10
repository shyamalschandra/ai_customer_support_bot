"use client";

import { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';

export default function Home() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const sendMessage = async () => {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const text = await res.text();
      console.log('Response text:', text); // Log the response text

      const data = JSON.parse(text);
      setResponse(data.response);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      setResponse('Error parsing response');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        AI Customer Support Chatbot
      </Typography>
      <TextField
        label="Type your message here..."
        variant="outlined"
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={sendMessage}>
        Send
      </Button>
      {response && (
        <Typography variant="body1" marginTop="20px">
          Response: {response}
        </Typography>
      )}
    </Container>
  );
}