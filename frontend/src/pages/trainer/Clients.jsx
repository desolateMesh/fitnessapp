// src/pages/trainer/Clients.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  UserPlus,
  Mail,
  Phone,
  MessageSquare,
  Video,
  Search,
  UserMinus,
  Settings,
} from 'lucide-react';
import api from '../../utils/api';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);

  // Get trainer info from localStorage
  const trainer = JSON.parse(localStorage.getItem('user')) || {};

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/trainer-clients/${trainer.id}`);
      // Map the response to include client details from the joined data
      const clientsWithDetails = response.data.map(tc => ({
        id: tc.client.id,
        first_name: tc.client.first_name,
        last_name: tc.client.last_name,
        email: tc.client.email,
        phone: tc.client.phone,
        status: tc.status,
        assigned_at: tc.assigned_at
      }));
      setClients(clientsWithDetails);
    } catch (err) {
      setError('Failed to fetch clients');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update handleAddClient function
  const handleAddClient = async (clientData) => {
    try {
      const response = await api.post('/trainer-clients', {
        trainerId: trainer.id,
        email: clientData.email
      });
      await fetchClients(); // Refresh the list after adding
      setOpenDialog(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add client');
      console.error('Error:', err);
    }
  };

  const handleRemoveClient = async (clientId) => {
    if (window.confirm('Are you sure you want to remove this client?')) {
      try {
        await api.delete(`/trainer-clients/${trainer.id}/${clientId}`);
        setClients(clients.filter(client => client.id !== clientId));
      } catch (err) {
        setError('Failed to remove client');
        console.error('Error:', err);
      }
    }
  };

  const filteredClients = clients.filter(client =>
    client.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Grid container spacing={3} alignItems="center" sx={{ mb: 3 }}>
          <Grid item xs>
            <Typography variant="h4" component="h1" gutterBottom>
              Client Management
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              startIcon={<UserPlus />}
              onClick={() => setOpenDialog(true)}
            >
              Add New Client
            </Button>
          </Grid>
        </Grid>

        {/* Search Bar */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <Search size={20} style={{ marginRight: 8 }} />,
            }}
          />
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Clients Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Client Name</TableCell>
                <TableCell>Contact Info</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Joined</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="subtitle2">
                          {client.first_name} {client.last_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {client.username}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2">{client.email}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {client.phone}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        backgroundColor: client.status === 'active' ? 'success.lighter' : 'warning.lighter',
                        color: client.status === 'active' ? 'success.main' : 'warning.main',
                        py: 0.5,
                        px: 1,
                        borderRadius: 1,
                        display: 'inline-block',
                      }}
                    >
                      {client.status}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {new Date(client.assigned_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <Tooltip title="Message">
                        <IconButton size="small">
                          <MessageSquare size={20} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Video Call">
                        <IconButton size="small">
                          <Video size={20} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Settings">
                        <IconButton size="small">
                          <Settings size={20} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Remove Client">
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleRemoveClient(client.id)}
                        >
                          <UserMinus size={20} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add Client Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Email"
                helperText="Enter client's email to send invitation"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleAddClient}>
              Send Invitation
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Clients;