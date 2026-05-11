/**
 * Sanos y Salvos — Main App
 * Root component with routing.
 */

import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ReportPet from './pages/ReportPet';
import MapView from './pages/MapView';
import Matches from './pages/Matches';
import { useAuth } from './context/AuthContext';

function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      alert('Debes iniciar sesion para ver las coincidencias.');
      navigate('/login', { replace: true });
    }
  }, [loading, user, navigate]);

  if (loading || !user) return null;
  return children;
}

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/report" element={<ReportPet />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/matches" element={<RequireAuth><Matches /></RequireAuth>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
