import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for clients
const mockClients = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Mike Johnson' },
];

// Mock data for progress chart
const mockProgressData = [
  { date: '2023-01-01', weight: 180, bodyFat: 20 },
  { date: '2023-02-01', weight: 178, bodyFat: 19 },
  { date: '2023-03-01', weight: 175, bodyFat: 18 },
  { date: '2023-04-01', weight: 173, bodyFat: 17 },
  { date: '2023-05-01', weight: 170, bodyFat: 16 },
];

const Progress = () => {
  const [selectedClient, setSelectedClient] = useState('');

  const handleClientChange = (event) => {
    setSelectedClient(event.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Client Progress
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <FormControl fullWidth>
                <InputLabel id="client-select-label">Select Client</InputLabel>
                <Select
                  labelId="client-select-label"
                  id="client-select"
                  value={selectedClient}
                  label="Select Client"
                  onChange={handleClientChange}
                >
                  {mockClients.map((client) => (
                    <MenuItem key={client.id} value={client.id}>
                      {client.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Progress Chart
              </Typography>
              {selectedClient ? (
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={mockProgressData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line yAxisId="right" type="monotone" dataKey="bodyFat" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              ) : (
                <Typography variant="body1">Select a client to view progress</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Progress;