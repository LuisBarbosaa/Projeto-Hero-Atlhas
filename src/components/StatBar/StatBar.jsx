import { useEffect, useState } from 'react';
import styles from './StatBar.module.css';

function StatBar({ label, value, color }) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 80);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className={styles.statRow}>
      <span className={styles.label}>{label}</span>
      <div className={styles.barBg}>
        <div
          className={styles.barFill}
          style={{ width: `${animatedValue}%`, backgroundColor: color }}
        />
      </div>
      <span className={styles.value}>{value}</span>
    </div>
  );
}

export default StatBar;
