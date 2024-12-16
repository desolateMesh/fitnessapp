// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import api from '../utils/api';  // Just one level up to src, then into utils
import { useNavigate } from 'react-router-dom';
import '../App.css';  // Same for App.css - just one level up

import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Eye, EyeOff, User, Lock } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending POST request to /api/auth/login');
      console.log('Username:', username);
      console.log('Password:', password);
      
      const response = await api.post('/auth/login', { username, password });
      const { token, role, id } = response.data;  // Add id here
      
      console.log('Login response:', response.data); // Log full response
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ id, role }));
      
      console.log('Stored user data:', localStorage.getItem('user')); // Log stored data
      
      switch (role) {
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'trainer':
          navigate('/trainer-dashboard');
          break;
        case 'client':
          navigate('/client-dashboard');
          break;
        default:
          setError('Invalid user role');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.error || 'Login failed');
    }
  };
  

  return (
    <Box 
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f3f4f6',
        py: 12,
        px: 3
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                mb: 3 
              }}
            >
              <img 
                src="/images/logo.png" 
                alt="Fitness App Logo" 
                style={{ height: 60, marginBottom: 16 }} 
              />
              <Typography component="h1" variant="h4" fontWeight="bold">
                Sign in to your account
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <User size={20} />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={20} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                disabled={isLoading}
                sx={{ 
                  mb: 2,
                  height: 48,
                  backgroundColor: '#3b82f6',
                  '&:hover': {
                    backgroundColor: '#2563eb',
                  }
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Sign In'
                )}
              </Button>

              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                gap: 4,
                mt: 4 
              }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/learn-more')}
                  sx={{ flex: 1 }}
                >
                  Learn More
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/request-account')}
                  sx={{ flex: 1 }}
                >
                  Request Account
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginPage;