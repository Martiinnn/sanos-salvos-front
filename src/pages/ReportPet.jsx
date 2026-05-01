/**
 * Sanos y Salvos — Report Pet Page
 * Multi-step form to report a lost or found pet.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { PawPrint, MapPin, Camera, Send, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { petsAPI, geoAPI } from '../api/client';

function LocationPicker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return position ? <Marker position={position} /> : null;
}

export default function ReportPet() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [position, setPosition] = useState(null);

  const [form, setForm] = useState({
    report_type: 'perdido',
    pet: { name: '', species: 'perro', breed: '', color: '', size: 'mediano', age_estimate: '', description: '', photo_url: '', distinctive_features: '' },
    latitude: -33.4489, longitude: -70.6693, address: '',
    date_event: new Date().toISOString().split('T')[0],
    contact_name: '', contact_phone: '', contact_email: '', notes: '',
  });

  const updatePet = (field, value) => setForm({ ...form, pet: { ...form.pet, [field]: value } });
  const updateField = (field, value) => setForm({ ...form, [field]: value });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = {
        ...form,
        latitude: position ? position[0] : form.latitude,
        longitude: position ? position[1] : form.longitude,
      };
      const res = await petsAPI.createReport(data);

      // Also register location in geo service
      try {
        await geoAPI.createLocation({
          report_id: res.data.id,
          latitude: data.latitude,
          longitude: data.longitude,
          address: data.address,
        });
      } catch {}

      setSuccess(true);
    } catch (err) {
      alert(err.response?.data?.detail || 'Error al crear reporte');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div className="brutal-card" style={{ padding: '50px', textAlign: 'center', maxWidth: '500px' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <CheckCircle size={40} color="var(--emerald-400)" />
          </div>
          <h2>¡Reporte Creado!</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '12px 0 24px' }}>
            Tu reporte ha sido registrado exitosamente. Nuestro motor de coincidencias está buscando posibles matches automáticamente.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button onClick={() => navigate('/map')} className="brutal-brutal-btn primary">Ver en Mapa</button>
            <button onClick={() => navigate('/')} className="brutal-brutal-btn secondary">Inicio</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: '700px', paddingTop: '30px', paddingBottom: '60px' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
          <PawPrint size={28} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 10, color: 'var(--emerald-400)' }} />
          Reportar Mascota
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Completa la información para crear un reporte</p>

        {/* Step Indicator */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '30px' }}>
          {[1, 2, 3].map((s) => (
            <div key={s} style={{
              flex: 1, height: 4, borderRadius: 2,
              background: s <= step ? 'var(--emerald-500)' : 'var(--bg-primary)',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>

        <div className="brutal-card" style={{ padding: '30px' }}>
          {/* Step 1: Pet Info */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ marginBottom: '4px' }}>Información del Animal</h3>

              <div style={{ display: 'flex', gap: '8px' }}>
                {['perdido', 'encontrado'].map(type => (
                  <button key={type} onClick={() => updateField('report_type', type)}
                    className={`brutal-btn ${form.report_type === type ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, textTransform: 'capitalize' }}>
                    {type === 'perdido' ? '🔴' : '🟢'} {type}
                  </button>
                ))}
              </div>

              <div className="grid-2">
                <div className="input-group">
                  <label>Nombre</label>
                  <input className="input-field" placeholder="Nombre de la mascota" value={form.pet.name} onChange={(e) => updatePet('name', e.target.value)} />
                </div>
                <div className="input-group">
                  <label>Especie *</label>
                  <select className="input-field" value={form.pet.species} onChange={(e) => updatePet('species', e.target.value)}>
                    <option value="perro">Perro</option>
                    <option value="gato">Gato</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>

              <div className="grid-2">
                <div className="input-group">
                  <label>Raza</label>
                  <input className="input-field" placeholder="Ej: Labrador, Mestizo" value={form.pet.breed} onChange={(e) => updatePet('breed', e.target.value)} />
                </div>
                <div className="input-group">
                  <label>Color *</label>
                  <input className="input-field" placeholder="Ej: Negro, Café con blanco" value={form.pet.color} onChange={(e) => updatePet('color', e.target.value)} required />
                </div>
              </div>

              <div className="grid-2">
                <div className="input-group">
                  <label>Tamaño *</label>
                  <select className="input-field" value={form.pet.size} onChange={(e) => updatePet('size', e.target.value)}>
                    <option value="pequeño">Pequeño</option>
                    <option value="mediano">Mediano</option>
                    <option value="grande">Grande</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Edad aproximada</label>
                  <input className="input-field" placeholder="Ej: 3 años, Cachorro" value={form.pet.age_estimate} onChange={(e) => updatePet('age_estimate', e.target.value)} />
                </div>
              </div>

              <div className="input-group">
                <label>Descripción</label>
                <textarea className="input-field" placeholder="Describe características adicionales..." value={form.pet.description} onChange={(e) => updatePet('description', e.target.value)} />
              </div>

              <div className="input-group">
                <label><Camera size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />URL de foto</label>
                <input className="input-field" placeholder="https://..." value={form.pet.photo_url} onChange={(e) => updatePet('photo_url', e.target.value)} />
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3><MapPin size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8 }} />Ubicación</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Haz clic en el mapa para marcar la ubicación</p>

              <div style={{ height: '350px', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <MapContainer center={[-33.4489, -70.6693]} zoom={13} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />
                  <LocationPicker position={position} setPosition={setPosition} />
                </MapContainer>
              </div>

              {position && (
                <p style={{ fontSize: '0.85rem', color: 'var(--emerald-400)' }}>
                  📍 Lat: {position[0].toFixed(4)}, Lng: {position[1].toFixed(4)}
                </p>
              )}

              <div className="input-group">
                <label>Dirección / Referencia</label>
                <input className="input-field" placeholder="Ej: Av. Providencia 123, Santiago" value={form.address} onChange={(e) => updateField('address', e.target.value)} />
              </div>

              <div className="input-group">
                <label>Fecha del evento</label>
                <input type="date" className="input-field" value={form.date_event} onChange={(e) => updateField('date_event', e.target.value)} />
              </div>
            </div>
          )}

          {/* Step 3: Contact */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3>Datos de Contacto</h3>

              <div className="input-group">
                <label>Nombre de contacto</label>
                <input className="input-field" placeholder="Tu nombre" value={form.contact_name} onChange={(e) => updateField('contact_name', e.target.value)} />
              </div>
              <div className="input-group">
                <label>Teléfono</label>
                <input className="input-field" placeholder="+56 9 1234 5678" value={form.contact_phone} onChange={(e) => updateField('contact_phone', e.target.value)} />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input type="email" className="input-field" placeholder="tu@email.com" value={form.contact_email} onChange={(e) => updateField('contact_email', e.target.value)} />
              </div>
              <div className="input-group">
                <label>Notas adicionales</label>
                <textarea className="input-field" placeholder="Cualquier información adicional..." value={form.notes} onChange={(e) => updateField('notes', e.target.value)} />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="brutal-brutal-btn secondary">
                <ArrowLeft size={16} /> Anterior
              </button>
            ) : <div />}

            {step < 3 ? (
              <button onClick={() => setStep(step + 1)} className="brutal-brutal-btn primary">
                Siguiente <ArrowRight size={16} />
              </button>
            ) : (
              <button onClick={handleSubmit} className="brutal-brutal-btn primary" disabled={loading}>
                {loading ? 'Enviando...' : <><Send size={16} /> Enviar Reporte</>}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
