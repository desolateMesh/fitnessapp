import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import TrainerDashboard from './components/Dashboard/TrainerDashboard';
import MemberDashboard from './components/Dashboard/MemberDashboard';
import LearnMore from './pages/LearnMore';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
          <Route path="/client-dashboard" element={<MemberDashboard />} />
          <Route path="/learn-more" element={<LearnMore />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

