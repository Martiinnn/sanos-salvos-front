/**
 * Sanos y Salvos — Register Page
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PawPrint, Mail, Lock, User, Phone, UserPlus } from 'lucide-react';

export default function Register() {
  const [form, setForm] = useState({ email: '', username: '', password: '', full_name: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="glass-card" style={{ padding: '40px', width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 'var(--radius-lg)',
            background: 'var(--gradient-primary)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
          }}>
            <PawPrint size={26} color="white" />
          </div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '6px' }}>Crear Cuenta</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Únete a la comunidad</p>
        </div>

        {error && (
          <div style={{
            padding: '10px 16px', borderRadius: 'var(--radius-md)',
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
            color: 'var(--red-400)', fontSize: '0.85rem', marginBottom: '20px',
          }}>{error}</div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="input-group">
            <label><User size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />Nombre completo</label>
            <input name="full_name" className="input-field" placeholder="Juan Pérez"
              value={form.full_name} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label><User size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />Usuario</label>
            <input name="username" className="input-field" placeholder="juanperez"
              value={form.username} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label><Mail size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />Email</label>
            <input type="email" name="email" className="input-field" placeholder="tu@email.com"
              value={form.email} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label><Phone size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />Teléfono</label>
            <input name="phone" className="input-field" placeholder="+56 9 1234 5678"
              value={form.phone} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label><Lock size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />Contraseña</label>
            <input type="password" name="password" className="input-field" placeholder="••••••••"
              value={form.password} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}
            style={{ width: '100%', marginTop: '8px' }}>
            {loading ? 'Creando...' : <><UserPlus size={16} /> Crear Cuenta</>}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" style={{ color: 'var(--emerald-400)', fontWeight: 600 }}>Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}
