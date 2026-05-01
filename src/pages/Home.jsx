import { Link } from 'react-router-dom';
import { PawPrint, MapPin, Search, ArrowRight, Shield, Zap, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { petsAPI } from '../api/client';

export default function Home() {
  const [stats, setStats] = useState({ total_perdidos: 0, total_encontrados: 0, total_activos: 0 });

  useEffect(() => {
    petsAPI.getStats().then(res => setStats(res.data)).catch(() => {});
  }, []);

  return (
    <div style={{ paddingBottom: '100px' }}>
      {/* Marquee Banner */}
      <div className="marquee-container">
        <div className="marquee-content">
          <span>ALERTA MASCOTAS PERDIDAS</span>
          <span>•</span>
          <span>SISTEMA DE MATCH EN TIEMPO REAL</span>
          <span>•</span>
          <span>REPORTE INMEDIATO</span>
          <span>•</span>
          <span>ALERTA MASCOTAS PERDIDAS</span>
          <span>•</span>
          <span>SISTEMA DE MATCH EN TIEMPO REAL</span>
          <span>•</span>
          <span>REPORTE INMEDIATO</span>
        </div>
      </div>

      {/* Hero Section */}
      <section style={{ 
        minHeight: '85vh', 
        display: 'flex', 
        alignItems: 'center',
        position: 'relative',
        padding: '80px 0',
        borderBottom: 'var(--border-thick)'
      }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            
            {/* Left Content */}
            <div className="animate-in">
              <div className="badge" style={{ marginBottom: '24px', background: 'var(--accent-green)' }}>
                PLATAFORMA ACTIVA
              </div>
              
              <h1 className="display-font" style={{ 
                fontSize: 'clamp(3rem, 7vw, 6rem)', 
                lineHeight: 0.9,
                marginBottom: '32px',
                textTransform: 'uppercase'
              }}>
                Encuentra <br/>a tu <span style={{ color: 'var(--accent-orange)' }}>Mascota.</span>
              </h1>
              
              <p style={{ 
                fontSize: '1.4rem', 
                maxWidth: '500px', 
                marginBottom: '40px',
                fontWeight: 500,
                borderLeft: '4px solid var(--accent-blue)',
                paddingLeft: '20px'
              }}>
                Uniendo ciudadanos, tecnología y datos. Motor de coincidencias avanzado en tiempo real.
              </p>

              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <Link to="/report" className="brutal-btn primary">
                  <PawPrint size={20} strokeWidth={3} /> REPORTE URGENTE
                </Link>
                <Link to="/map" className="brutal-btn">
                  <MapPin size={20} strokeWidth={3} /> EXPLORAR ZONAS
                </Link>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="animate-in delay-2" style={{ position: 'relative', height: '100%', minHeight: '500px' }}>
              <div style={{ 
                position: 'absolute', 
                top: '5%', right: '5%', 
                width: '90%', height: '90%', 
                background: 'var(--accent-orange)',
                border: 'var(--border-thick)',
                transform: 'rotate(3deg)'
              }} />
              <div style={{ 
                position: 'absolute', 
                top: '10%', right: '10%', 
                width: '90%', height: '90%', 
                border: 'var(--border-thick)',
                transform: 'rotate(-2deg)',
                overflow: 'hidden',
                background: 'white'
              }}>
                <img src="/hero-pets.png" alt="Sanos y Salvos" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '80px 0', background: 'var(--bg-secondary)', borderBottom: 'var(--border-thick)' }}>
        <div className="container animate-in delay-3">
          <div className="grid-3">
            {[
              { val: stats.total_perdidos, label: 'BÚSQUEDAS ACTIVAS', color: 'var(--accent-orange)' },
              { val: stats.total_encontrados, label: 'MASCOTAS SALVADAS', color: 'var(--accent-green)' },
              { val: stats.total_activos, label: 'TOTAL REPORTES', color: 'var(--accent-blue)' }
            ].map((s, i) => (
              <div key={i} className="brutal-card" style={{ textAlign: 'center', borderTop: `8px solid ${s.color}` }}>
                <div style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 800, fontSize: '4rem', color: s.color, lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontWeight: 700, marginTop: '10px', fontSize: '1.1rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Big CTA */}
      <section style={{ padding: '40px 0' }}>
        <div className="container">
          <div style={{ 
            background: 'var(--text-primary)', 
            color: 'var(--bg-primary)',
            padding: '80px 40px',
            textAlign: 'center',
            border: 'var(--border-thick)'
          }}>
            <h2 className="display-font" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '24px' }}>
              ACTÚA AHORA.
            </h2>
            <p style={{ fontSize: '1.5rem', maxWidth: '600px', margin: '0 auto 40px' }}>
              Cada hora cuenta. Nuestro sistema cruza datos al instante.
            </p>
            <Link to="/report" className="brutal-btn primary" style={{ fontSize: '1.5rem', padding: '24px 48px' }}>
              INGRESAR REPORTE <ArrowRight size={28} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
