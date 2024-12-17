// src/pages/member/Workouts.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Dumbbell } from 'lucide-react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import api from '../../utils/api';

const Workouts = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bodyWeight, setBodyWeight] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userData = JSON.parse(localStorage.getItem('user')) || {};

  useEffect(() => {
    if (userData.id) {
      fetchWorkouts();
    }
  }, [selectedDate, userData.id]);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/workouts/client/${userData.id}`);
      console.log('Fetched workouts:', response.data);
      setWorkouts(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching workouts:', err);
      setError('Failed to load workouts');
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleStatsSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/workouts/stats/${userData.id}`, {
        bodyWeight,
        bodyFat,
        date: selectedDate
      });
      alert('Stats saved successfully!');
      setBodyWeight('');
      setBodyFat('');
    } catch (err) {
      console.error('Error saving stats:', err);
      alert('Failed to save stats');
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Dumbbell size={32} />
          Workouts
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Grid container spacing={3}>
          {/* Calendar Card */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="Calendar" />
              <CardContent>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateCalendar
                    value={selectedDate}
                    onChange={handleDateSelect}
                  />
                </LocalizationProvider>
              </CardContent>
            </Card>
          </Grid>

          {/* Body Stats Card */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="Body Stats" />
              <CardContent>
                <Box component="form" onSubmit={handleStatsSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Body Weight (lbs)"
                    type="number"
                    value={bodyWeight}
                    onChange={(e) => setBodyWeight(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label="Body Fat %"
                    type="number"
                    value={bodyFat}
                    onChange={(e) => setBodyFat(e.target.value)}
                    fullWidth
                  />
                  <Button variant="contained" type="submit">
                    Save Stats
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Stats Card */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="Recent Stats" />
              <CardContent>
                <Typography>Body Weight: 180 lbs</Typography>
                <Typography>Body Fat: 15%</Typography>
                <Typography>Last Updated: June 1, 2023</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Workout History */}
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Workout History" />
              <CardContent>
                {loading ? (
                  <Typography>Loading workouts...</Typography>
                ) : workouts.length > 0 ? (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Exercise</TableCell>
                          <TableCell>Reps</TableCell>
                          <TableCell>Sets</TableCell>
                          <TableCell>Weight (lbs)</TableCell>
                          <TableCell>Time (min)</TableCell>
                          <TableCell>Notes</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {workouts.map((workout, index) => (
                          <TableRow key={index}>
                            <TableCell>{workout.date}</TableCell>
                            <TableCell>{workout.type}</TableCell>
                            <TableCell>{workout.exercise}</TableCell>
                            <TableCell>{workout.reps}</TableCell>
                            <TableCell>{workout.sets}</TableCell>
                            <TableCell>{workout.weight}</TableCell>
                            <TableCell>{workout.time}</TableCell>
                            <TableCell>{workout.notes}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography>No workouts found for the selected date.</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Workouts;