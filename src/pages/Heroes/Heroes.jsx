import { useEffect, useMemo, useState } from 'react';
import HeroCard from '../../components/HeroCard/HeroCard';
import FilterBar from '../../components/FilterBar/FilterBar';
import Loader from '../../components/Loader/Loader';
import { getAllHeroes } from '../../services/api';
import styles from './Heroes.module.css';

function Heroes() {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [publisher, setPublisher] = useState('All');
  const [alignment, setAlignment] = useState('All');

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getAllHeroes();
        setHeroes(data);
      } catch {
        setError('Failed to load heroes. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchHeroes();
  }, []);

  const filtered = useMemo(() => {
    return heroes
      .filter((hero) => hero.name.toLowerCase().includes(search.toLowerCase()))
      .filter(
        (hero) =>
          publisher === 'All' ||
          (hero.biography?.publisher || '').toLowerCase().includes(publisher.toLowerCase()),
      )
      .filter(
        (hero) => alignment === 'All' || hero.biography?.alignment === alignment.toLowerCase(),
      );
  }, [heroes, search, publisher, alignment]);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1>Heroes Database</h1>

        <FilterBar
          search={search}
          setSearch={setSearch}
          publisher={publisher}
          setPublisher={setPublisher}
          alignment={alignment}
          setAlignment={setAlignment}
          total={heroes.length}
          filtered={filtered.length}
        />

        {loading && <Loader />}

        {!loading && error && <p className={styles.error}>{error}</p>}

        {!loading && !error && (
          <section className={styles.grid}>
            {filtered.map((hero) => (
              <HeroCard key={hero.id} hero={hero} />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

export default Heroes;
