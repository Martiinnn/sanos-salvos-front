/**
 * Sanos y Salvos — Home Page
 */

import { Link } from 'react-router-dom';
import { PawPrint, MapPin, Search, Bell, ArrowRight, Shield, Zap, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { petsAPI } from '../api/client';

export default function Home() {
  const [stats, setStats] = useState({ total_perdidos: 0, total_encontrados: 0, total_activos: 0 });

  useEffect(() => {
    petsAPI.getStats().then(res => setStats(res.data)).catch(() => {});
  }, []);

  const features = [
    { icon: MapPin, title: 'Geolocalización', desc: 'Mapa interactivo con reportes y zonas de alta incidencia en tiempo real', color: 'var(--ocean-500)' },
    { icon: Search, title: 'Motor de Match', desc: 'Algoritmo inteligente que cruza datos automáticamente', color: 'var(--purple-500)' },
    { icon: Bell, title: 'Alertas en Vivo', desc: 'Notificaciones instantáneas via WebSocket al detectar coincidencia', color: 'var(--amber-500)' },
    { icon: Shield, title: 'Seguridad JWT', desc: 'Autenticación robusta con tokens JWT y encriptación', color: 'var(--emerald-500)' },
    { icon: Zap, title: 'Eventos Asíncronos', desc: 'Arquitectura orientada a eventos con RabbitMQ', color: 'var(--red-400)' },
    { icon: Globe, title: 'Microservicios', desc: '4 microservicios independientes con bases de datos aisladas', color: 'var(--ocean-400)' },
  ];

  return (
    <div className="page">
      {/* Hero */}
      <section style={{
        minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '10%', left: '15%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />

        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div className="animate-fade-in">
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 16px', borderRadius: 'var(--radius-full)',
              background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
              marginBottom: '24px', fontSize: '0.85rem', color: 'var(--emerald-400)',
            }}>
              <PawPrint size={14} /> Plataforma de Rescate Animal
            </div>

            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '20px', lineHeight: 1.1 }}>
              Encuentra a tu mascota{' '}
              <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Sanos y Salvos
              </span>
            </h1>

            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 36px' }}>
              Plataforma inteligente que conecta ciudadanos, veterinarias y refugios para localizar y recuperar mascotas perdidas mediante geolocalización y algoritmos de coincidencia.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/report" className="btn btn-primary btn-lg">
                <PawPrint size={18} /> Reportar Mascota <ArrowRight size={16} />
              </Link>
              <Link to="/map" className="btn btn-secondary btn-lg">
                <MapPin size={18} /> Ver Mapa
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="animate-fade-in animate-delay-2"
            style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '60px', flexWrap: 'wrap' }}>
            {[
              { value: stats.total_perdidos, label: 'Perdidos activos', color: 'var(--red-400)' },
              { value: stats.total_encontrados, label: 'Encontrados', color: 'var(--emerald-400)' },
              { value: stats.total_activos, label: 'Reportes totales', color: 'var(--ocean-400)' },
            ].map((stat, i) => (
              <div key={i} className="glass-card" style={{ padding: '24px 36px', textAlign: 'center', minWidth: '160px' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'Outfit', color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '12px' }}>
              Arquitectura de <span style={{ color: 'var(--emerald-400)' }}>Microservicios</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
              Sistema distribuido y orientado a eventos para máxima escalabilidad y resiliencia
            </p>
          </div>

          <div className="grid-3">
            {features.map((f, i) => (
              <div key={i} className="glass-card animate-fade-in" style={{ padding: '28px', cursor: 'default', animationDelay: `${i * 0.1}s`, opacity: 0 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 'var(--radius-md)',
                  background: `${f.color}15`, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', marginBottom: '16px',
                }}>
                  <f.icon size={22} color={f.color} />
                </div>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '8px' }}>{f.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="glass-card" style={{
            padding: '50px', textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(16,185,129,0.05), rgba(14,165,233,0.05))',
            border: '1px solid rgba(16,185,129,0.15)',
          }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>¿Perdiste a tu mascota?</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Crea un reporte ahora y nuestro motor de coincidencias buscará automáticamente.
            </p>
            <Link to="/report" className="btn btn-primary btn-lg">
              Crear Reporte Ahora <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
