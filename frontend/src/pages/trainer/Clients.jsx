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
  MessageSquare,
  UserMinus,
} from 'lucide-react';
import api from '../../utils/api';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [formError, setFormError] = useState('');
  const [newClient, setNewClient] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: '',
    role: 'client'
  });

  const trainer = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      console.log('Fetching clients for trainer ID:', trainer.id);
      const response = await api.get(`/trainer/clients/${trainer.id}`);
      console.log('Fetched clients:', response.data);
      setClients(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching clients:', err);
      setError('Failed to fetch clients');
    } finally {
      setLoading(false);
    }
  };

  const handleAddClient = async () => {
    try {
      setFormError('');
      console.log('Creating client for trainer:', trainer.id);
      
      // Create the user first
      const userResponse = await api.post('/users', {
        ...newClient,
        role: 'client'
      });
      console.log('Created user:', userResponse.data);

      // Create the trainer-client relationship
      const relationshipResponse = await api.post('/trainer/clients', {
        trainer_id: trainer.id,
        client_id: userResponse.data.id
      });
      console.log('Created trainer-client relationship:', relationshipResponse.data);

      await fetchClients();
      setOpenDialog(false);
      setNewClient({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        phone: '',
        role: 'client'
      });
    } catch (err) {
      console.error('Error creating client:', err);
      setFormError(err.response?.data?.error || 'Failed to create client account');
    }
  };

  // Rest of your component code remains the same...

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Grid container spacing={3} alignItems="center" sx={{ mb: 3 }}>
          <Grid item xs>
            <Typography variant="h4">Client Management</Typography>
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

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No clients found
                  </TableCell>
                </TableRow>
              ) : (
                clients.map((clientRelation) => (
                  <TableRow key={clientRelation.id}>
                    <TableCell>
                      {clientRelation.client?.first_name} {clientRelation.client?.last_name}
                    </TableCell>
                    <TableCell>{clientRelation.client?.email}</TableCell>
                    <TableCell>{clientRelation.client?.phone}</TableCell>
                    <TableCell>
                      <Tooltip title="Message">
                        <IconButton>
                          <MessageSquare />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Remove Client">
                        <IconButton color="error">
                          <UserMinus />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogContent>
            {formError && <Alert severity="error" sx={{ mb: 2 }}>{formError}</Alert>}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={newClient.first_name}
                    onChange={(e) => setNewClient({ ...newClient, first_name: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={newClient.last_name}
                    onChange={(e) => setNewClient({ ...newClient, last_name: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={newClient.email}
                    onChange={(e) =>
                      setNewClient({
                        ...newClient,
                        email: e.target.value,
                        username: e.target.value.split('@')[0],
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={newClient.password}
                    onChange={(e) => setNewClient({ ...newClient, password: e.target.value })}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button 
              variant="contained" 
              onClick={handleAddClient}
              disabled={!newClient.email || !newClient.password}
            >
              Create Client Account
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Clients;