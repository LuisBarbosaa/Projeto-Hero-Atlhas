import styles from './Loader.module.css';

function Loader() {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite" aria-label="Loading">
      <div className={styles.loader} />
    </div>
  );
}

export default Loader;
