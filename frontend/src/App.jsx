import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/features/auth/authSlice';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieNotice from './CookieNotice';
import './App.css';
import ManageBanner from './pages/dashboard/admin/banner/ManageBanner';

function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      <CookieNotice />
    </div>
  );
}

export default App;
