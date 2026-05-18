import { useEffect, useRef } from 'react';
import styles from './AdSlot.module.css';

const AD_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT;

const sizeMap = {
  leaderboard: { w: '100%', h: '90px',  adSlot: import.meta.env.VITE_ADSENSE_SLOT_LEADERBOARD },
  rectangle:   { w: '100%', h: '250px', adSlot: import.meta.env.VITE_ADSENSE_SLOT_RECTANGLE },
  skyscraper:  { w: '100%', h: '600px', adSlot: import.meta.env.VITE_ADSENSE_SLOT_SKYSCRAPER },
  square:      { w: '100%', h: '200px', adSlot: import.meta.env.VITE_ADSENSE_SLOT_SQUARE },
};

interface AdSlotProps {
  size: 'leaderboard' | 'rectangle' | 'skyscraper' | 'square';
}

export default function AdSlot({ size }: AdSlotProps) {
  const { w, h, adSlot } = sizeMap[size];
  const pushed = useRef(false);

  useEffect(() => {
    if (!pushed.current) {
      pushed.current = true;
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }
  }, []);

  return (
    <div
      className={`ad-slot ${styles.slot}`}
      style={{ width: w, minHeight: h }}
      aria-label="Advertisement"
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: w, height: h }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}