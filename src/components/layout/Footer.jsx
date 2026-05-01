/**
 * Sanos y Salvos — Footer
 */

import { PawPrint, Heart, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-glass)',
      background: 'rgba(10, 15, 26, 0.9)',
      padding: '40px 0 20px',
      marginTop: '60px',
    }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '30px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{
                width: 36, height: 36, borderRadius: 'var(--radius-md)',
                background: 'var(--gradient-primary)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <PawPrint size={18} color="white" />
              </div>
              <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '1.1rem' }}>
                Sanos & Salvos
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '300px' }}>
              Plataforma de localización y recuperación de mascotas perdidas.
              Conectando comunidades para reunir familias.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Servicios
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><a href="/report" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Reportar mascota</a></li>
              <li><a href="/map" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Mapa interactivo</a></li>
              <li><a href="/matches" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Coincidencias</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Arquitectura
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Microservicios FastAPI</li>
              <li style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>RabbitMQ Events</li>
              <li style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>PostgreSQL + PostGIS</li>
              <li style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>MongoDB</li>
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--border-glass)',
          marginTop: '30px', paddingTop: '20px',
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px',
          color: 'var(--text-muted)', fontSize: '0.8rem',
        }}>
          Hecho con <Heart size={14} color="var(--red-400)" fill="var(--red-400)" /> por Martin & Matias — 2026
        </div>
      </div>
    </footer>
  );
}
