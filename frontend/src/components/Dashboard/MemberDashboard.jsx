// src/pages/MemberDashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Divider,
  Avatar,
} from '@mui/material';
import {
  Activity,
  Calendar,
  Dumbbell,
  Apple,
  Target,
  Clock,
  Trophy,
  TrendingUp,
  Heart,
  MessageSquare,
  Video,
} from 'lucide-react';
import api from '../../utils/api';

const MemberDashboard = () => {
  const [activeTab, setActiveTab] = useState('workouts');
  const [trainerInfo, setTrainerInfo] = useState(null);
  const [error, setError] = useState(null);

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('user')) || {};
  const username = userData.username || 'Member';
  
  useEffect(() => {
    fetchTrainerInfo();
  }, []);

  const fetchTrainerInfo = async () => {
    try {
      const response = await api.get(`/trainer-clients/trainer/${userData.id}`);
      if (response.data?.trainer) {
        setTrainerInfo(response.data.trainer);
      }
    } catch (err) {
      console.error('Error fetching trainer info:', err);
      setError('Failed to load trainer information');
    }
  };
  
  // Mock data for member stats
  const memberStats = {
    workoutsCompleted: 24,
    nextSession: "Tomorrow at 10:00 AM",
    caloriesBurned: 12500,
    workoutGoal: 30,
    weightProgress: 85,
    attendanceRate: 90,
    streakDays: 15,
    nutritionScore: 80,
  };

  const tabs = [
    { id: 'workouts', label: 'Workouts', icon: <Dumbbell size={20} /> },
    { id: 'schedule', label: 'Schedule', icon: <Calendar size={20} /> },
    { id: 'nutrition', label: 'Nutrition', icon: <Apple size={20} /> },
    { id: 'progress', label: 'Progress', icon: <TrendingUp size={20} /> },
    { id: 'goals', label: 'Goals', icon: <Target size={20} /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare size={20} /> },
    { id: 'videochat', label: 'Video Chat', icon: <Video size={20} /> },
  ];

  const ProgressCard = ({ title, value, icon, metric, color = 'primary' }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
              {value}
              {metric && (
                <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  {metric}
                </Typography>
              )}
            </Typography>
          </Box>
          <Box sx={{ 
            backgroundColor: `${color}.lighter`,
            p: 1,
            borderRadius: 2,
            color: `${color}.main`
          }}>
            {icon}
          </Box>
        </Box>
        {typeof value === 'number' && (
          <LinearProgress 
            variant="determinate" 
            value={(value / 100) * 100} 
            sx={{ 
              mt: 2,
              height: 6,
              borderRadius: 1,
              [`& .MuiLinearProgress-bar`]: {
                backgroundColor: `${color}.main`
              }
            }} 
          />
        )}
      </CardContent>
    </Card>
  );

  const renderTabContent = (tabId) => {
    switch(tabId) {
      case 'workouts':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Upcoming Workouts
              </Typography>
              <Paper sx={{ p: 2 }}>
                Coming soon...
              </Paper>
            </Grid>
          </Grid>
        );
      default:
        return (
          <Box sx={{ textAlign: 'center', color: 'text.secondary', py: 4 }}>
            Content for {tabs.find(t => t.id === tabId)?.label} tab coming soon...
          </Box>
        );
    }
  };

  return (
    <Box sx={{ 
      backgroundColor: 'background.default',
      minHeight: '100vh',
      py: 3
    }}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {/* Welcome Section with Trainer Info */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
              <Box>
                <Typography variant="h4" gutterBottom>
                  Welcome back, {username}!
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Here's your fitness journey overview
                </Typography>
              </Box>
              {trainerInfo && (
                <Card sx={{ minWidth: 300 }}>
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 50, height: 50 }}>
                      {trainerInfo.username?.[0]?.toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Your Trainer
                      </Typography>
                      <Typography variant="h6">
                        {trainerInfo.username}
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<MessageSquare size={16} />}
                        sx={{ mt: 1 }}
                      >
                        Message Trainer
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              )}
            </Box>
          </Grid>

          {/* Stats Cards */}
          <Grid item xs={12} md={3}>
            <ProgressCard
              title="Workouts Completed"
              value={memberStats.workoutsCompleted}
              icon={<Activity size={24} />}
              metric="/ 30 Goal"
              color="success"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <ProgressCard
              title="Next Session"
              value={memberStats.nextSession}
              icon={<Clock size={24} />}
              color="info"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <ProgressCard
              title="Calories Burned"
              value={memberStats.caloriesBurned}
              icon={<Heart size={24} />}
              metric="kcal"
              color="error"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <ProgressCard
              title="Current Streak"
              value={memberStats.streakDays}
              icon={<Trophy size={24} />}
              metric="days"
              color="warning"
            />
          </Grid>

          {/* Main Content */}
          <Grid item xs={12}>
            <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
              {/* Navigation Tabs */}
              <Box sx={{ 
                backgroundColor: 'background.neutral',
                p: 2,
                borderBottom: 1,
                borderColor: 'divider'
              }}>
                <Grid container spacing={2}>
                  {tabs.map(tab => (
                    <Grid item key={tab.id}>
                      <Button
                        variant={activeTab === tab.id ? 'contained' : 'text'}
                        onClick={() => setActiveTab(tab.id)}
                        startIcon={tab.icon}
                        sx={{
                          px: 3,
                          py: 1,
                          textTransform: 'none',
                          ...(activeTab === tab.id && {
                            backgroundColor: 'primary.main',
                            '&:hover': {
                              backgroundColor: 'primary.dark',
                            }
                          })
                        }}
                      >
                        {tab.label}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Tab Content */}
              <Box sx={{ p: 3 }}>
                {renderTabContent(activeTab)}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MemberDashboard;