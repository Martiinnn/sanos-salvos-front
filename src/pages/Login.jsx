/**
 * Sanos y Salvos — Login Page
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PawPrint, Mail, Lock, LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ position: 'absolute', top: '20%', left: '20%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="glass-card" style={{ padding: '40px', width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 'var(--radius-lg)',
            background: 'var(--gradient-primary)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
          }}>
            <PawPrint size={26} color="white" />
          </div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '6px' }}>Bienvenido</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Inicia sesión en tu cuenta</p>
        </div>

        {error && (
          <div style={{
            padding: '10px 16px', borderRadius: 'var(--radius-md)',
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
            color: 'var(--red-400)', fontSize: '0.85rem', marginBottom: '20px',
          }}>{error}</div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="input-group">
            <label><Mail size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />Email</label>
            <input type="email" className="input-field" placeholder="tu@email.com"
              value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="input-group">
            <label><Lock size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />Contraseña</label>
            <input type="password" className="input-field" placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}
            style={{ width: '100%', marginTop: '8px' }}>
            {loading ? 'Cargando...' : <><LogIn size={16} /> Iniciar Sesión</>}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          ¿No tienes cuenta?{' '}
          <Link to="/register" style={{ color: 'var(--emerald-400)', fontWeight: 600 }}>Regístrate</Link>
        </p>

        <div style={{ textAlign: 'center', marginTop: '16px', padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(14,165,233,0.06)', border: '1px solid rgba(14,165,233,0.1)' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Demo: <strong style={{ color: 'var(--ocean-400)' }}>demo@sanosysalvos.cl</strong> / <strong style={{ color: 'var(--ocean-400)' }}>demo123</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
