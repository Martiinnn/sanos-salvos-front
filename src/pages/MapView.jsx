/**
 * Sanos y Salvos — Map View Page
 * Interactive Leaflet map with pet report markers in Neo-Brutalist style.
 */

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Loader } from 'lucide-react';
import { geoAPI } from '../api/client';
import 'leaflet/dist/leaflet.css'; // CRITICAL: Fixes broken map tiles

// Brutalist custom marker icons
const lostIcon = new L.DivIcon({
  html: '<div style="width:36px;height:36px;background:var(--accent-orange);border:4px solid var(--text-primary);display:flex;align-items:center;justify-content:center;box-shadow:4px 4px 0px var(--text-primary);transform:rotate(-5deg);font-weight:900;font-family:Syne;color:white;">P</div>',
  iconSize: [36, 36], className: '',
});
const foundIcon = new L.DivIcon({
  html: '<div style="width:36px;height:36px;background:var(--accent-green);border:4px solid var(--text-primary);display:flex;align-items:center;justify-content:center;box-shadow:4px 4px 0px var(--text-primary);transform:rotate(5deg);font-weight:900;font-family:Syne;color:white;">E</div>',
  iconSize: [36, 36], className: '',
});

export default function MapView() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('todos');

  useEffect(() => {
    geoAPI.getReports()
      .then(res => setReports(res.data))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'todos' ? reports :
    reports.filter(r => r.report_type === filter);

  return (
    <div style={{ paddingBottom: '80px' }}>

      {/* Header */}
      <div style={{ background: 'white', borderBottom: 'var(--border-thick)', padding: '40px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>

            <div>
              <h1 className="display-font" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <MapPin size={48} color="var(--text-primary)" strokeWidth={3} /> MAPA DE REPORTES
              </h1>
              <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                {filtered.length} reportes activos
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', background: 'var(--bg-secondary)', padding: '8px', border: 'var(--border-thick)' }}>
              {[
                { value: 'todos', label: 'Todos' },
                { value: 'perdido', label: 'Perdidos', color: 'var(--accent-orange)' },
                { value: 'encontrado', label: 'Encontrados', color: 'var(--accent-green)' },
              ].map(f => (
                <button key={f.value} onClick={() => setFilter(f.value)}
                  className={`brutal-btn ${filter === f.value ? '' : 'secondary'}`}
                  style={{
                    padding: '8px 16px', fontSize: '1rem',
                    background: filter === f.value ? (f.color || 'var(--text-primary)') : 'white',
                    color: filter === f.value ? 'white' : 'var(--text-primary)',
                    boxShadow: filter === f.value ? '2px 2px 0px var(--text-primary)' : 'none'
                  }}>
                  {f.color && <div style={{ width: 12, height: 12, background: f.color, border: '2px solid var(--text-primary)', borderRadius: '50%', display: 'inline-block', marginRight: 6 }}></div>}
                  {f.label}
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="container" style={{ marginTop: '40px' }}>
        <div className="animate-in delay-1" style={{
          border: 'var(--border-thick)',
          background: 'var(--bg-secondary)',
          boxShadow: '16px 16px 0px var(--text-primary)',
          height: '70vh',
          position: 'relative'
        }}>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <Loader size={64} className="animate-spin" style={{ color: 'var(--text-primary)' }} />
              <h2 className="display-font" style={{ marginTop: '20px' }}>CARGANDO MAPA...</h2>
            </div>
          ) : (
            <MapContainer center={[-33.4489, -70.6693]} zoom={12} style={{ height: '100%', width: '100%', zIndex: 1 }}>
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; OpenStreetMap'
              />
              {filtered.map((r, i) => (
                <Marker key={i} position={[r.lat, r.lng]}
                  icon={r.report_type === 'perdido' ? lostIcon : foundIcon}>
                  <Popup className="brutal-popup">
                    <div style={{ minWidth: '220px', fontFamily: 'DM Sans', color: 'var(--text-primary)' }}>
                      <div style={{ borderBottom: '2px solid var(--text-primary)', paddingBottom: '8px', marginBottom: '8px' }}>
                        <div className="badge" style={{
                          background: r.report_type === 'perdido' ? 'var(--accent-orange)' : 'var(--accent-green)',
                          color: 'white', border: '2px solid var(--text-primary)', marginBottom: '4px'
                        }}>
                          {r.report_type}
                        </div>
                        <h3 className="display-font" style={{ fontSize: '1.2rem', margin: 0 }}>{r.pet_name || 'Sin nombre'}</h3>
                      </div>

                      {r.photo_url && (
                        <div style={{ border: '2px solid var(--text-primary)', marginBottom: '8px', overflow: 'hidden' }}>
                          <img src={r.photo_url} alt="" style={{ width: '100%', display: 'block' }} />
                        </div>
                      )}

                      <p style={{ margin: '4px 0', fontSize: '0.9rem', fontWeight: 600 }}>{r.species} • {r.breed}</p>
                      <p style={{ margin: '4px 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{r.color} | {r.size}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '32px', marginTop: '40px', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1rem', fontWeight: 700 }}>
            <div style={{ width: 24, height: 24, background: 'var(--accent-orange)', border: '2px solid var(--text-primary)' }} /> PERDIDO
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1rem', fontWeight: 700 }}>
            <div style={{ width: 24, height: 24, background: 'var(--accent-green)', border: '2px solid var(--text-primary)' }} /> ENCONTRADO
          </div>
        </div>
      </div>

    </div>
  );
}
