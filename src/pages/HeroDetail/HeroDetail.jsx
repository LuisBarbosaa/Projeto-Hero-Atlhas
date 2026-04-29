import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import StatBar from '../../components/StatBar/StatBar';
import { getHeroById } from '../../services/api';
import styles from './HeroDetail.module.css';

function getPublisherColor(publisher = '') {
  if (publisher.includes('Marvel')) {
    return 'var(--accent-marvel)';
  }

  if (publisher.includes('DC')) {
    return 'var(--accent-dc)';
  }

  return 'var(--accent-neutral)';
}

function getAlignmentLabel(alignment = '') {
  if (alignment === 'good') {
    return { text: 'HERO', className: 'heroBadge' };
  }

  if (alignment === 'bad') {
    return { text: 'VILLAIN', className: 'villainBadge' };
  }

  return { text: 'NEUTRAL', className: 'neutralBadge' };
}

function HeroDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHero = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getHeroById(id);
        setHero(data);
      } catch {
        setError('Hero not found or API unavailable.');
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, [id]);

  const statsList = useMemo(() => {
    if (!hero) {
      return [];
    }

    const stats = hero.powerstats || {};
    const safeValue = (value) => value ?? 0;

    return [
      ['Intelligence', safeValue(stats.intelligence)],
      ['Strength', safeValue(stats.strength)],
      ['Speed', safeValue(stats.speed)],
      ['Durability', safeValue(stats.durability)],
      ['Power', safeValue(stats.power)],
      ['Combat', safeValue(stats.combat)],
    ];
  }, [hero]);

  if (loading) {
    return <Loader />;
  }

  if (error || !hero) {
    return (
      <main className={styles.page}>
        <div className={styles.errorWrap}>
          <p>{error || 'Unknown error.'}</p>
          <button type="button" onClick={() => navigate('/heroes')}>
            Go to Heroes
          </button>
        </div>
      </main>
    );
  }

  const publisher = hero.biography?.publisher || 'Unknown';
  const accentColor = getPublisherColor(publisher);
  const alignment = getAlignmentLabel(hero.biography?.alignment || '');

  return (
    <main className={styles.page} style={{ '--publisher-accent': accentColor }}>
      <div className={styles.container}>
        <button type="button" className={styles.backButton} onClick={() => navigate(-1)}>
          ← BACK
        </button>

        <section className={styles.layout}>
          <aside className={styles.visualPane}>
            <img src={hero.images?.lg} alt={hero.name} />
            <span className={styles.publisherBadge}>{publisher}</span>
            <span className={`${styles.alignmentBadge} ${styles[alignment.className]}`}>
              {alignment.text}
            </span>
          </aside>

          <article className={styles.infoPane}>
            <h1>{hero.name}</h1>
            <h2>{hero.biography?.fullName || 'Unknown Identity'}</h2>

            <div className={styles.quickInfo}>
              <p>📍 {hero.work?.base || 'Unknown base'}</p>
              <p>💼 {hero.work?.occupation || 'Unknown occupation'}</p>
              <p>✨ First: {hero.biography?.firstAppearance || 'Unknown'}</p>
            </div>

            <section className={styles.statsSection}>
              <h3>Power Stats</h3>
              <div className={styles.statsList}>
                {statsList.map(([label, value]) => (
                  <StatBar key={label} label={label} value={value} color={accentColor} />
                ))}
              </div>
            </section>

            <section className={styles.appearanceSection}>
              <h3>Appearance</h3>
              <div className={styles.appearanceGrid}>
                <p>Gender: {hero.appearance?.gender || 'Unknown'}</p>
                <p>Race: {hero.appearance?.race || 'Unknown'}</p>
                <p>Height: {(hero.appearance?.height || []).join(' / ') || 'Unknown'}</p>
                <p>Weight: {(hero.appearance?.weight || []).join(' / ') || 'Unknown'}</p>
                <p>Eyes: {hero.appearance?.eyeColor || 'Unknown'}</p>
                <p>Hair: {hero.appearance?.hairColor || 'Unknown'}</p>
              </div>
            </section>

            <section className={styles.connectionsSection}>
              <h3>Affiliations</h3>
              <p>{hero.connections?.groupAffiliation || 'Unknown'}</p>
              <h3>Relatives</h3>
              <p>{hero.connections?.relatives || 'Unknown'}</p>
            </section>
          </article>
        </section>
      </div>
    </main>
  );
}

export default HeroDetail;
