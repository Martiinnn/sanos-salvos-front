/**
 * Sanos y Salvos — Navbar
 */

import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PawPrint, Map, Search, Bell, LogOut, User, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { notificationsAPI } from '../../api/client';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      notificationsAPI.getUnreadCount()
        .then(res => setUnreadCount(res.data.count))
        .catch(() => {});
    }
  }, [user, location]);

  // WebSocket for real-time notification count
  useEffect(() => {
    if (!user) return;
    let ws;
    try {
      const wsUrl = `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/api/notifications/ws/${user.id}`;
      ws = new WebSocket(wsUrl);
      ws.onmessage = () => setUnreadCount(prev => prev + 1);
      ws.onerror = () => {};
    } catch {}
    return () => ws?.close();
  }, [user]);

  const navLinks = [
    { to: '/', label: 'Inicio', icon: PawPrint },
    { to: '/map', label: 'Mapa', icon: Map },
    { to: '/matches', label: 'Coincidencias', icon: Search },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: 'rgba(10, 15, 26, 0.85)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-glass)',
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '70px',
      }}>
        {/* Logo */}
        <Link to="/" style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          color: 'var(--text-primary)', fontFamily: 'Outfit', fontWeight: 700,
          fontSize: '1.3rem',
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: 'var(--radius-md)',
            background: 'var(--gradient-primary)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <PawPrint size={20} color="white" />
          </div>
          <span>Sanos<span style={{ color: 'var(--emerald-400)' }}>&</span>Salvos</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
             className="desktop-nav">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 16px', borderRadius: 'var(--radius-md)',
              color: isActive(to) ? 'var(--emerald-400)' : 'var(--text-secondary)',
              background: isActive(to) ? 'rgba(16,185,129,0.1)' : 'transparent',
              fontSize: '0.9rem', fontWeight: 500,
              transition: 'all var(--transition-fast)',
            }}>
              <Icon size={16} /> {label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {user ? (
            <>
              <Link to="/report" className="btn btn-primary btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <PawPrint size={14} /> Reportar
              </Link>

              <Link to="/notifications" style={{ position: 'relative', color: 'var(--text-secondary)' }}>
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span style={{
                    position: 'absolute', top: -6, right: -6,
                    width: 18, height: 18, borderRadius: '50%',
                    background: 'var(--red-500)', color: 'white',
                    fontSize: '0.65rem', fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{unreadCount}</span>
                )}
              </Link>

              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '4px 12px 4px 4px',
                background: 'var(--bg-input)', borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-glass)',
              }}>
                <div style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: 'var(--gradient-primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <User size={14} color="white" />
                </div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {user.username}
                </span>
              </div>

              <button onClick={logout} style={{
                background: 'none', border: 'none', color: 'var(--text-muted)',
                cursor: 'pointer', padding: '4px',
              }}>
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary btn-sm">Ingresar</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Registrarse</Link>
            </>
          )}

          <button onClick={() => setMenuOpen(!menuOpen)}
                  className="mobile-menu-btn"
                  style={{
                    display: 'none', background: 'none', border: 'none',
                    color: 'var(--text-primary)', cursor: 'pointer',
                  }}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
