import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

// Mock data for clients
const mockClients = [
  { id: 1, name: 'John Doe', avatar: '/path-to-avatar/john.jpg' },
  { id: 2, name: 'Jane Smith', avatar: '/path-to-avatar/jane.jpg' },
  { id: 3, name: 'Mike Johnson', avatar: '/path-to-avatar/mike.jpg' },
];

const Messages = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [message, setMessage] = useState('');

  const handleClientSelect = (client) => {
    setSelectedClient(client);
  };

  const handleMessageSend = () => {
    if (message.trim() && selectedClient) {
      console.log(`Message sent to ${selectedClient.name}: ${message}`);
      setMessage('');
      // TODO: Implement actual message sending logic
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Messages
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Clients
              </Typography>
              <List>
                {mockClients.map((client) => (
                  <ListItem
                    button
                    key={client.id}
                    selected={selectedClient && selectedClient.id === client.id}
                    onClick={() => handleClientSelect(client)}
                  >
                    <ListItemAvatar>
                      <Avatar src={client.avatar} alt={client.name} />
                    </ListItemAvatar>
                    <ListItemText primary={client.name} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              {selectedClient ? (
                <>
                  <Typography variant="h6" gutterBottom>
                    Chat with {selectedClient.name}
                  </Typography>
                  <Paper
                    sx={{
                      height: 300,
                      overflow: 'auto',
                      mb: 2,
                      p: 2,
                      backgroundColor: '#f5f5f5',
                    }}
                  >
                    {/* Chat messages will be displayed here */}
                    <Typography variant="body2" color="text.secondary">
                      No messages yet. Start a conversation!
                    </Typography>
                  </Paper>
                  <Grid container spacing={2}>
                    <Grid item xs={10}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        endIcon={<SendIcon />}
                        onClick={handleMessageSend}
                      >
                        Send
                      </Button>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <Typography variant="body1">Select a client to start messaging</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Messages;