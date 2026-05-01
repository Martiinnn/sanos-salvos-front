/**
 * Sanos y Salvos — Map View Page
 * Interactive Leaflet map with pet report markers.
 */

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Filter, Loader } from 'lucide-react';
import { geoAPI } from '../api/client';

// Custom marker icons
const lostIcon = new L.DivIcon({
  html: '<div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#ef4444,#dc2626);display:flex;align-items:center;justify-content:center;border:2px solid rgba(255,255,255,0.3);box-shadow:0 0 12px rgba(239,68,68,0.4);font-size:14px;">🔴</div>',
  iconSize: [28, 28], className: '',
});
const foundIcon = new L.DivIcon({
  html: '<div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#10b981,#059669);display:flex;align-items:center;justify-content:center;border:2px solid rgba(255,255,255,0.3);box-shadow:0 0 12px rgba(16,185,129,0.4);font-size:14px;">🟢</div>',
  iconSize: [28, 28], className: '',
});

export default function MapView() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('todos');

  useEffect(() => {
    geoAPI.getReports()
      .then(res => setReports(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'todos' ? reports :
    reports.filter(r => r.report_type === filter);

  return (
    <div className="page">
      <div className="container" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={24} color="var(--emerald-400)" /> Mapa de Reportes
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {filtered.length} reportes activos
            </p>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {[
              { value: 'todos', label: 'Todos' },
              { value: 'perdido', label: '🔴 Perdidos' },
              { value: 'encontrado', label: '🟢 Encontrados' },
            ].map(f => (
              <button key={f.value} onClick={() => setFilter(f.value)}
                className={`btn btn-sm ${filter === f.value ? 'btn-primary' : 'btn-secondary'}`}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card" style={{ overflow: 'hidden', height: 'calc(100vh - 220px)' }}>
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <Loader size={32} className="animate-spin" style={{ color: 'var(--emerald-400)' }} />
            </div>
          ) : (
            <MapContainer center={[-33.4489, -70.6693]} zoom={12}
              style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; OpenStreetMap'
              />
              {filtered.map((r, i) => (
                <Marker key={i} position={[r.lat, r.lng]}
                  icon={r.report_type === 'perdido' ? lostIcon : foundIcon}>
                  <Popup>
                    <div style={{ minWidth: '200px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span className={`badge badge-${r.report_type === 'perdido' ? 'lost' : 'found'}`}>
                          {r.report_type}
                        </span>
                        <strong>{r.pet_name || 'Sin nombre'}</strong>
                      </div>
                      {r.photo_url && <img src={r.photo_url} alt="" style={{ width: '100%', borderRadius: '8px', marginBottom: '8px' }} />}
                      <p style={{ margin: '4px 0', fontSize: '0.85rem' }}>
                        <strong>Especie:</strong> {r.species} {r.breed && `(${r.breed})`}
                      </p>
                      <p style={{ margin: '4px 0', fontSize: '0.85rem' }}>
                        <strong>Color:</strong> {r.color} | <strong>Tamaño:</strong> {r.size}
                      </p>
                      {r.address && <p style={{ margin: '4px 0', fontSize: '0.85rem' }}><strong>📍</strong> {r.address}</p>}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '16px', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} /> Perdido
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }} /> Encontrado
          </div>
        </div>
      </div>
    </div>
  );
}
