// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Alert,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  Users,
  FileText,
  DollarSign,
  BarChart2,
  Settings,
  HelpCircle,
  Shield,
  MessageSquare,
  Mail,
  Ticket,
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('user-management');
  
  const stats = {
    totalUsers: 1250,
    activeTrainers: 45,
    activeClients: 1150,
    monthlyRevenue: 25000,
    supportTickets: 12,
    pendingApprovals: 5
  };

  const tabs = [
    { id: 'user-management', label: 'Users', icon: <Users size={20} /> },
    { id: 'content-moderation', label: 'Content', icon: <FileText size={20} /> },
    { id: 'financial', label: 'Finance', icon: <DollarSign size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
    { id: 'support', label: 'Support', icon: <HelpCircle size={20} /> },
    { id: 'compliance', label: 'Compliance', icon: <Shield size={20} /> },
    { id: 'feedback', label: 'Feedback', icon: <MessageSquare size={20} /> },
    { id: 'marketing', label: 'Marketing', icon: <Mail size={20} /> }
  ];

  const renderTabContent = (tabId) => {
    const tab = tabs.find(t => t.id === tabId);
    return (
      <Box sx={{ textAlign: 'center', color: 'text.secondary', py: 4 }}>
        Content for {tab?.label} tab coming soon...
      </Box>
    );
  };

  const StatCard = ({ title, value, icon }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold' }}>
              {typeof value === 'number' && title.includes('Revenue') ? `$${value.toLocaleString()}` : value.toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ 
            backgroundColor: 'primary.lighter',
            p: 1,
            borderRadius: 2,
            color: 'primary.main'
          }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ 
      backgroundColor: 'background.default',
      minHeight: '100vh',
      py: 3
    }}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {/* Stats Section */}
          <Grid item xs={12} md={4}>
            <StatCard
              title="Total Users"
              value={stats.totalUsers}
              icon={<Users size={24} />}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard
              title="Monthly Revenue"
              value={stats.monthlyRevenue}
              icon={<DollarSign size={24} />}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard
              title="Support Tickets"
              value={stats.supportTickets}
              icon={<Ticket size={24} />}
            />
          </Grid>

          {/* Alerts Section */}
          {stats.pendingApprovals > 0 && (
            <Grid item xs={12}>
              <Alert 
                severity="warning"
                sx={{ 
                  borderRadius: 2,
                  '& .MuiAlert-message': {
                    fontSize: '1rem'
                  }
                }}
              >
                You have {stats.pendingApprovals} pending trainer approvals that require your attention.
              </Alert>
            </Grid>
          )}

          {/* Main Dashboard Content */}
          <Grid item xs={12}>
            <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
              {/* Navigation Tabs */}
              <Box sx={{ 
                backgroundColor: 'background.neutral',
                p: 2,
                borderBottom: 1,
                borderColor: 'divider'
              }}>
                <Grid container spacing={1}>
                  {tabs.map(tab => (
                    <Grid item xs={6} sm={4} md={3} lg={true} key={tab.id}>
                      <Button
                        fullWidth
                        variant={activeTab === tab.id ? 'contained' : 'text'}
                        onClick={() => setActiveTab(tab.id)}
                        startIcon={tab.icon}
                        sx={{
                          py: 1,
                          px: 2,
                          justifyContent: 'flex-start',
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

export default AdminDashboard;