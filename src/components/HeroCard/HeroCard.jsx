import { useNavigate } from 'react-router-dom';
import styles from './HeroCard.module.css';

const FALLBACK_IMAGE = 'https://via.placeholder.com/400x500/1a1a2e/f0f0f0?text=Hero';

function getPublisherClass(publisher = '') {
  if (publisher.includes('Marvel')) {
    return 'marvel';
  }

  if (publisher.includes('DC')) {
    return 'dc';
  }

  return 'neutral';
}

function HeroCard({ hero }) {
  const navigate = useNavigate();
  const publisher = hero.biography?.publisher ?? 'Unknown';
  const publisherClass = getPublisherClass(publisher);

  return (
    <article
      className={`${styles.card} ${styles[publisherClass]}`}
      onClick={() => navigate(`/heroes/${hero.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          navigate(`/heroes/${hero.id}`);
        }
      }}
    >
      <div className={styles.imageWrap}>
        <img
          src={hero.images?.md}
          alt={hero.name}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
        <span className={`${styles.badge} ${styles[`${publisherClass}Badge`]}`}>{publisher}</span>
      </div>

      <div className={styles.content}>
        <h3>{hero.name}</h3>
        <p>{hero.biography?.fullName || 'Unknown Identity'}</p>

        <div className={styles.stats}>
          <span>
            ⚡ PWR {hero.powerstats?.power ?? 0}
          </span>
          <span>
            🛡 DUR {hero.powerstats?.durability ?? 0}
          </span>
        </div>
      </div>
    </article>
  );
}

export default HeroCard;
