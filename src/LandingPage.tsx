import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleBegin = () => {
    // Animate zoom/fade out
    if (overlayRef.current) {
      overlayRef.current.classList.add('zoom-out');
      setTimeout(() => navigate('/confetti'), 700); // match animation duration
    } else {
      navigate('/confetti');
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Light mode map background */}
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ width: '100vw', height: '100vh', filter: 'blur(2px) brightness(1.2) grayscale(0.1)' }}
        zoomControl={false}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        attributionControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      {/* Overlay with message and button */}
      <div
        ref={overlayRef}
        className="landing-overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.7)',
          transition: 'transform 0.7s cubic-bezier(.4,2,.6,1), opacity 0.7s',
          zIndex: 2,
        }}
      >
        <h1 style={{ fontSize: '2.5rem', color: '#222', marginBottom: '1.5rem', textShadow: '0 2px 8px #fff8' }}>
          A World of Memories
        </h1>
        <button
          onClick={handleBegin}
          style={{
            fontSize: '1.2rem',
            padding: '0.8em 2em',
            borderRadius: '2em',
            border: 'none',
            background: '#222',
            color: '#fff',
            cursor: 'pointer',
            boxShadow: '0 2px 8px #0002',
            transition: 'background 0.2s',
          }}
        >
          Begin
        </button>
      </div>
      <style>{`
        .landing-overlay.zoom-out {
          transform: scale(1.2);
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
