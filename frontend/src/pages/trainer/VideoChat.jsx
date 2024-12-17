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
  Button,
  Box,
} from '@mui/material';
import { Videocam as VideocamIcon } from '@mui/icons-material';

// Mock data for clients
const mockClients = [
  { id: 1, name: 'John Doe', avatar: '/path-to-avatar/john.jpg' },
  { id: 2, name: 'Jane Smith', avatar: '/path-to-avatar/jane.jpg' },
  { id: 3, name: 'Mike Johnson', avatar: '/path-to-avatar/mike.jpg' },
];

const VideoChat = () => {
  const [selectedClient, setSelectedClient] = useState(null);

  const handleClientSelect = (client) => {
    setSelectedClient(client);
  };

  const handleStartVideoCall = () => {
    if (selectedClient) {
      console.log(`Starting video call with ${selectedClient.name}`);
      // TODO: Implement actual video call logic
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Video Chat
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
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              {selectedClient ? (
                <>
                  <Typography variant="h6" gutterBottom>
                    Video Call with {selectedClient.name}
                  </Typography>
                  <Box
                    sx={{
                      width: '100%',
                      height: 300,
                      backgroundColor: '#f5f5f5',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mb: 2,
                    }}
                  >
                    <Typography variant="body1">Video call area</Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<VideocamIcon />}
                    onClick={handleStartVideoCall}
                  >
                    Start Video Call
                  </Button>
                </>
              ) : (
                <Typography variant="body1">Select a client to start a video call</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default VideoChat;