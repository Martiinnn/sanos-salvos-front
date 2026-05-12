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
      const code = err?.code || '';
      if (code === 'auth/email-already-in-use') {
        setError('El email ya esta registrado');
      } else if (code === 'auth/weak-password') {
        setError('La contrasena es muy debil (minimo 6 caracteres)');
      } else if (code === 'auth/invalid-email') {
        setError('Email invalido');
      } else {
        setError('Error al registrar');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div className="brutal-card animate-in auth-card register-card" style={{ width: '100%', maxWidth: '700px', padding: '30px 40px' }}>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '48px', height: '48px', background: 'var(--accent-orange)', color: 'white',
            border: 'var(--border-thick)', borderRadius: 'var(--radius-sharp)', marginBottom: '10px'
          }}>
            <PawPrint size={24} />
          </div>
          <h1 className="display-font" style={{ fontSize: '2rem' }}>CREAR CUENTA</h1>
          <p style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Únete a la comunidad de rescate</p>
        </div>

        {error && (
          <div style={{
            background: 'var(--accent-orange)', color: 'white', padding: '16px',
            border: 'var(--border-thick)', fontWeight: 700, marginBottom: '24px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="register-form" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

          <div>
            <label className="display-font" style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px' }}>NOMBRE COMPLETO</label>
            <input name="full_name" className="brutal-input" placeholder="Ej. Juan Pérez"
              value={form.full_name} onChange={handleChange} required />
          </div>

          <div>
            <label className="display-font" style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px' }}>USUARIO</label>
            <input name="username" className="brutal-input" placeholder="juanperez"
              value={form.username} onChange={handleChange} required />
          </div>

          <div>
            <label className="display-font" style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px' }}>EMAIL</label>
            <input type="email" name="email" className="brutal-input" placeholder="tu@email.com"
              value={form.email} onChange={handleChange} required />
          </div>

          <div>
            <label className="display-font" style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px' }}>TELÉFONO</label>
            <input name="phone" className="brutal-input" placeholder="+56 9 1234 5678"
              value={form.phone} onChange={handleChange} />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label className="display-font" style={{ display: 'block', fontSize: '0.9rem', marginBottom: '4px' }}>CONTRASEÑA</label>
            <input type="password" name="password" className="brutal-input" placeholder="••••••••"
              value={form.password} onChange={handleChange} required />
          </div>

          <button type="submit" className="brutal-btn primary" disabled={loading} style={{ gridColumn: '1 / -1', marginTop: '10px', width: '100%', padding: '12px 24px' }}>
            {loading ? 'CREANDO...' : <><UserPlus size={20} /> CREAR CUENTA</>}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '30px', fontWeight: 600 }}>
          ¿Ya tienes cuenta? <Link to="/login" style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
}
