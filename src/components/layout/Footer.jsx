import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ 
      background: 'var(--text-primary)', 
      color: 'var(--bg-primary)',
      padding: '80px 0 40px',
      borderTop: 'var(--border-thick)'
    }}>
      <div className="container">
        <div className="grid-3" style={{ marginBottom: '60px' }}>
          <div>
            <h3 className="display-font" style={{ fontSize: '2rem', marginBottom: '16px' }}>
              SANOS<span style={{ color: 'var(--accent-orange)' }}>&</span>SALVOS
            </h3>
            <p style={{ maxWidth: '300px', fontSize: '1.1rem' }}>
              Plataforma de rescate animal propulsada por datos, geolocalización y algoritmos de coincidencia inteligente.
            </p>
          </div>
          
          <div>
            <h4 className="display-font" style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'var(--text-muted)' }}>SISTEMA</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontWeight: 600 }}>
              <li><a href="#" style={{ textDecoration: 'underline' }}>Reportar Mascota</a></li>
              <li><a href="#" style={{ textDecoration: 'underline' }}>Ver Mapa</a></li>
              <li><a href="#" style={{ textDecoration: 'underline' }}>Motor de Matches</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="display-font" style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'var(--text-muted)' }}>ESTADO</h4>
            <p style={{ fontWeight: 600, maxWidth: '300px' }}>
              Plataforma operativa para reportes, autenticacion y seguimiento de coincidencias.
            </p>
          </div>
        </div>
        
        <div style={{ 
          borderTop: '1px solid #333', 
          paddingTop: '30px',
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <p style={{ fontWeight: 500 }}>&copy; 2026 Sanos y Salvos. All rights reserved.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
            Hecho con <Heart size={18} color="var(--accent-orange)" fill="var(--accent-orange)" /> en Chile
          </p>
        </div>
      </div>
    </footer>
  );
}
