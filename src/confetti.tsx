import { useEffect, useRef } from 'react';
import GlobeMap from './GlobeMap';
import ConfettiOnLoad from './confetti_on_load';
import 'leaflet/dist/leaflet.css';

const MapPage = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
  audioRef.current = new Audio(import.meta.env.BASE_URL + 'music/thendral_vanthu_instrumental.opus');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.2;
      audioRef.current.play().catch(() => {
        document.addEventListener('click', () => audioRef.current?.play(), { once: true });
      });
    }
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

    return (
        <>
            <ConfettiOnLoad />
            <GlobeMap />
        </>
    );
};

export default MapPage;
