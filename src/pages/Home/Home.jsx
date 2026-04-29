import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { getHeroById } from '../../services/api';
import styles from './Home.module.css';

const FEATURED_IDS = [70, 620, 644];

function Home() {
  const navigate = useNavigate();
  const [featuredHeroes, setFeaturedHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setError('');
        const heroes = await Promise.all(FEATURED_IDS.map((id) => getHeroById(id)));
        setFeaturedHeroes(heroes);
      } catch {
        setError('Could not load featured heroes right now.');
        setFeaturedHeroes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <main className={styles.home}>
      <section className={styles.heroSection}>
        <h1>HERO ATLAS</h1>
        <p>731 heroes. One universe.</p>
        <div className={styles.ctaGroup}>
          <button type="button" onClick={() => navigate('/heroes')}>
            EXPLORE HEROES
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => navigate('/heroes/70')}
          >
            START WITH BATMAN
          </button>
        </div>
      </section>

      <section className={styles.featured}>
        <h2>Featured Heroes</h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <div className={styles.grid}>
            {featuredHeroes.map((hero) => (
              <article
                key={hero.id}
                className={styles.featuredCard}
                onClick={() => navigate(`/heroes/${hero.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    navigate(`/heroes/${hero.id}`);
                  }
                }}
              >
                <img src={hero.images?.md} alt={hero.name} loading="lazy" />
                <div>
                  <h3>{hero.name}</h3>
                  <p>{hero.biography?.publisher}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
