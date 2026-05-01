/**
 * Sanos y Salvos — Main App
 * Root component with routing.
 */

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ReportPet from './pages/ReportPet';
import MapView from './pages/MapView';
import Matches from './pages/Matches';

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
          <Route path="/matches" element={<Matches />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
