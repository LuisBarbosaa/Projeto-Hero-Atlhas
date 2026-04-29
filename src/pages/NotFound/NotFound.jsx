import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      <h1>404</h1>
      <p>Even heroes get lost sometimes.</p>
      <button type="button" onClick={() => navigate('/')}>
        Back Home
      </button>
    </main>
  );
}

export default NotFound;
