import styles from './AdSlot.module.css';

interface AdSlotProps {
  size: 'leaderboard' | 'rectangle' | 'skyscraper' | 'square';
  label?: string;
  // Replace these with real AdSense slot IDs in production:
  // adClient?: string;
  // adSlot?: string;
}

const sizeMap = {
  leaderboard: { w: '100%', h: '90px', label: '728×90 - Leaderboard' },
  rectangle: { w: '100%', h: '250px', label: '300×250 - Medium Rectangle' },
  skyscraper: { w: '100%', h: '600px', label: '200×600 - Wide Skyscraper' },
  square: { w: '100%', h: '200px', label: '200×200 - Small Square' },
};

export default function AdSlot({ size, label }: AdSlotProps) {
  const { w, h, label: defaultLabel } = sizeMap[size];
  return (
    <div
      className={`ad-slot ${styles.slot}`}
      style={{ width: w, height: h, minHeight: h }}
      aria-label="Advertisement"
    >
      <span>Advertisement</span>
      <span style={{ fontSize: 10, color: 'var(--color-text-3)' }}>{label ?? defaultLabel}</span>
      {/* In production, replace with:
        <ins className="adsbygoogle"
          style={{ display:'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="XXXXXXXXXX"
          data-ad-format="auto"
          data-full-width-responsive="true" />
      */}
    </div>
  );
}