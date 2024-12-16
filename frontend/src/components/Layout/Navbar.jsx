import React from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { user } = useSelector(state => state.auth);
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-semibold">FitLife</div>
      <div className="flex items-center space-x-4">
        {user && <span>Hello, {user.name}</span>}
      </div>
    </nav>
  );
};

export default Navbar;
