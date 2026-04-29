import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        HERO ATLAS
      </Link>
      <div className={styles.links}>
        <Link to="/" className={location.pathname === '/' ? styles.active : ''}>
          Home
        </Link>
        <Link
          to="/heroes"
          className={location.pathname.startsWith('/heroes') ? styles.active : ''}
        >
          Heroes
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
