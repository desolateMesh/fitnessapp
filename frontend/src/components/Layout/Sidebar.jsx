import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="bg-gray-100 border-r p-4 min-h-screen hidden md:block">
      <nav className="flex flex-col space-y-4">
        <Link to="/dashboard/member">Member Dashboard</Link>
        <Link to="/dashboard/trainer">Trainer Dashboard</Link>
        <Link to="/workouts">Workouts</Link>
        <Link to="/nutrition">Nutrition</Link>
        <Link to="/appointments">Appointments</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/admin">Admin</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
