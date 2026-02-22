import React, { useRef, useState, useEffect } from 'react';
import Globe from 'react-globe.gl';
import albumData from './album_schema.json';
import './GlobeMap.css';

interface Marker {
  id: string;
  lat: number;
  lng: number;
  name: string;
  caption: string;
  images: { path: string; caption: string }[];
}

const markers: Marker[] = albumData.markers.map((m: any) => ({
  ...m,
  lat: Number(m.lat),
  lng: Number(m.lng)
}));

const GlobeMap = () => {
  const globeEl = useRef<any>(null);
  const [selected, setSelected] = useState<Marker | null>(null);
  const [imageIdx, setImageIdx] = useState(0);

  // Face globe toward India on load
  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.pointOfView({ lat: 20.6, lng: 78.9, altitude: 0.7 }, 1200);
    }
  }, []);

  const handlePointClick = (point: Marker) => {
    setSelected(point);
    setImageIdx(0);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setSelected(null);
  };

  return (
    <div className="globe-container">
      {/* Page Title Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        zIndex: 5,
        textAlign: 'center',
        pointerEvents: 'none',
        padding: '2.5vh 0 1vh 0',
        animation: 'fadeInTitle 1.2s cubic-bezier(.4,2,.6,1)',
      }}>
        <h1 style={{
          fontSize: '2.1rem',
          fontWeight: 700,
          letterSpacing: '0.02em',
          margin: 0,
          fontFamily: 'Poppins, Inter, system-ui, Arial, sans-serif',
          textShadow: '0 2px 12px #000a',
          background: 'linear-gradient(270deg, #ffe082, #ffb300, #ff4081, #7c4dff, #40c4ff, #00e676, #ffe082)',
          backgroundSize: '1400% 100%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          display: 'inline-block',
          padding: '0.25em 1.5em',
          animation: 'moveGradient 8s linear infinite',
        }}>
          Celebrating a lifetime of dedication. Happy retirement!
        </h1>
        <style>{`
          @keyframes fadeInTitle {
            from { opacity: 0; transform: translateY(-24px); }
            to { opacity: 1; transform: none; }
          }
          @keyframes moveGradient {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
        `}</style>
      </div>
      <Globe
        ref={globeEl}
        globeImageUrl="/earth.jpg"
        backgroundColor="#222"
        labelsData={markers}
        labelLat={(d: any) => d.lat}
        labelLng={(d: any) => d.lng}
        labelColor={() => 'rgba(255, 193, 7, 0.95)'} // gold
        labelDotRadius={0.18}
        labelResolution={24}
        labelLabel={(d: any) => d.name}
        labelText={() => '' /* hide default label text since we're showing it in the popup */}
        onLabelClick={(label: object) => handlePointClick(label as Marker)}
        width={window.innerWidth}
        height={window.innerHeight}
        atmosphereColor="#fff"
        atmosphereAltitude={0.15}
      />
      {selected && (
        <div className="globe-popup" onClick={handleOverlayClick}>
          <div className="globe-popup-inner" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.3em', marginBottom: '1em', textAlign: 'center' }}>{selected.caption}</h2>
            {selected.images && selected.images.length > 0 && (
              <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img
                  src={`/${selected.images[imageIdx].path}`}
                  alt={selected.images[imageIdx].caption}
                  style={{
                    maxWidth: '90vw',
                    maxHeight: '60vh',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    borderRadius: '12px',
                    background: '#222',
                    marginBottom: '0.5em',
                  }}
                />
                {selected.images.length > 1 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1em', margin: '0.5em 0' }}>
                    <button onClick={() => setImageIdx(i => (i === 0 ? selected.images.length - 1 : i - 1))}>&lt;</button>
                    <span style={{ fontSize: '0.9em' }}>{imageIdx + 1} / {selected.images.length}</span>
                    <button onClick={() => setImageIdx(i => (i === selected.images.length - 1 ? 0 : i + 1))}>&gt;</button>
                  </div>
                )}
                <p style={{ fontSize: '1em', margin: 0, textAlign: 'center' }}><em>{selected.images[imageIdx].caption}</em></p>
              </div>
            )}
            <button className="close-btn" onClick={() => setSelected(null)} style={{ marginTop: '1em' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobeMap;
