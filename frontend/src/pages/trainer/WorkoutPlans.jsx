import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

// Mock data
const mockVideos = [
  { id: 1, title: 'Workout 1', url: '/placeholder.svg?height=200&width=200' },
  { id: 2, title: 'Workout 2', url: '/placeholder.svg?height=200&width=200' },
  { id: 3, title: 'Workout 3', url: '/placeholder.svg?height=200&width=200' },
  { id: 4, title: 'Workout 4', url: '/placeholder.svg?height=200&width=200' },
];

const mockClients = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Mike Johnson' },
];

const WorkoutPlans = () => {
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [workoutForm, setWorkoutForm] = useState({
    exercise: '',
    reps: '',
    time: '',
    notes: '',
  });

  const handleVideoToggle = (videoId) => {
    setSelectedVideos((prev) =>
      prev.includes(videoId) ? prev.filter((id) => id !== videoId) : [...prev, videoId]
    );
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsFormOpen(true);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Workout Plans
        </Typography>

        <Box
          sx={{
            height: '500px',           // Fixed height for the scrollable section
            overflowY: 'auto',         // Enable vertical scrollbar
            border: '1px solid #ddd',  // Optional: Border for visual clarity
            borderRadius: '8px',       // Optional: Rounded corners
            p: 2,                      // Padding for internal spacing
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          }}
        >
          {/* Client Selection */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Select Client
            </Typography>
            <FormControl fullWidth sx={{ maxWidth: 300 }}>
              <InputLabel>Client</InputLabel>
              <Select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                label="Client"
              >
                {mockClients.map((client) => (
                  <MenuItem key={client.id} value={client.id}>
                    {client.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Video Library */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Video Library
            </Typography>
            <Grid container spacing={2}>
              {mockVideos.map((video) => (
                <Grid item xs={12} sm={6} md={3} key={video.id}>
                  <Card>
                    <CardMedia component="img" height="140" image={video.url} alt={video.title} />
                    <CardContent>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedVideos.includes(video.id)}
                            onChange={() => handleVideoToggle(video.id)}
                          />
                        }
                        label={video.title}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Calendar */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Calendar
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateCalendar value={selectedDate} onChange={handleDateClick} />
            </LocalizationProvider>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default WorkoutPlans;
