import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PawPrint, User, LogOut, Menu, X, Bell } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { notificationsAPI } from '../../api/client';
import { showToast } from '../../utils/toast';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(0);

  // Reset visual badge while user is on matches page
  useEffect(() => {
    if (location.pathname === '/matches') {
      setNotifications(0);
    }
  }, [location.pathname]);

  // Poll unread notifications count for current user
  useEffect(() => {
    let cancelled = false;
    let intervalId;

    const fetchUnread = async () => {
      if (!user?.id) {
        if (!cancelled) setNotifications(0);
        return;
      }
      try {
        const res = await notificationsAPI.getUnreadCount(user.id);
        if (!cancelled && location.pathname !== '/matches') {
          setNotifications(res.data?.count || 0);
        }
      } catch {
        if (!cancelled) setNotifications(0);
      }
    };

    fetchUnread();
    intervalId = setInterval(fetchUnread, 10000);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, [user?.id, location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleMatchesClick = () => {
    if (!user) {
      showToast('Debes iniciar sesion para ver las coincidencias.', 'warning');
      navigate('/login');
      return;
    }
    navigate('/matches');
    setIsOpen(false);
  };

  return (
    <nav className="navbar-root" style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'var(--bg-primary)',
      borderBottom: 'var(--border-thick)',
      padding: '20px 0'
    }}>
      <div className="container navbar-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Logo */}
        <Link to="/" className="navbar-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'var(--text-primary)', color: 'var(--bg-primary)',
            padding: '8px', border: 'var(--border-thin)', borderRadius: 'var(--radius-sharp)'
          }}>
            <PawPrint size={24} strokeWidth={2.5} />
          </div>
          <span className="display-font navbar-logo-text" style={{ fontSize: '1.6rem', letterSpacing: '-0.05em' }}>
            SANOS<span style={{ color: 'var(--accent-orange)' }}>&</span>SALVOS
          </span>
        </Link>

        {/* Desktop Menu */}
        <div style={{ display: 'none', gap: '32px', alignItems: 'center' }} className="md-flex">
          <Link to="/" style={{ fontWeight: 700, textTransform: 'uppercase' }}>INICIO</Link>
          <Link to="/map" style={{ fontWeight: 700, textTransform: 'uppercase' }}>MAPA</Link>
        </div>

        {/* Auth Buttons */}
        <div style={{ display: 'none', gap: '16px', alignItems: 'center' }} className="md-flex navbar-auth-wrap">
          <button
            onClick={handleMatchesClick}
            className="nav-icon-btn"
            title="Coincidencias"
          >
            <Bell size={16} />
            {notifications > 0 && (
              <span className="nav-icon-badge">
                {notifications}
              </span>
            )}
          </button>
          {user ? (
            <>
              <span style={{ fontWeight: 700, textTransform: 'uppercase' }}><User size={16} style={{display:'inline', marginBottom:'-2px'}}/> {user.full_name || user.username}</span>
              <button onClick={handleLogout} className="brutal-btn" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                <LogOut size={16} /> SALIR
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ fontWeight: 700, textTransform: 'uppercase' }}>INGRESAR</Link>
              <Link to="/register" className="brutal-btn primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
                REGISTRARSE
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md-hidden brutal-btn" style={{ padding: '8px' }} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'var(--bg-primary)', borderBottom: 'var(--border-thick)',
          padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px',
          borderTop: 'var(--border-thick)'
        }}>
          <Link to="/" onClick={() => setIsOpen(false)} style={{ fontWeight: 700, fontSize:'1.2rem' }}>INICIO</Link>
          <Link to="/map" onClick={() => setIsOpen(false)} style={{ fontWeight: 700, fontSize:'1.2rem' }}>MAPA</Link>
          <button onClick={handleMatchesClick} className="brutal-btn" style={{ width: '100%' }}>
            <Bell size={16} /> Coincidencias
          </button>
          <hr style={{ border: 'none', borderTop: 'var(--border-thin)' }} />
          {user ? (
            <button onClick={() => { handleLogout(); setIsOpen(false); }} className="brutal-btn" style={{ width: '100%' }}>SALIR</button>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="brutal-btn" style={{ width: '100%' }}>INGRESAR</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="brutal-btn primary" style={{ width: '100%' }}>REGISTRARSE</Link>
            </>
          )}
        </div>
      )}
      
      <style>{`
        @media (min-width: 768px) {
          .md-flex { display: flex !important; }
          .md-hidden { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
