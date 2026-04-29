import styles from './FilterBar.module.css';

function FilterBar({
  search,
  setSearch,
  publisher,
  setPublisher,
  alignment,
  setAlignment,
  total,
  filtered,
}) {
  return (
    <section className={styles.container}>
      <input
        type="text"
        className={styles.search}
        placeholder="Search hero by name..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <div className={styles.group}>
        <span>Publisher</span>
        {['All', 'Marvel', 'DC'].map((item) => (
          <button
            key={item}
            type="button"
            className={publisher === item ? styles.active : ''}
            onClick={() => setPublisher(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className={styles.group}>
        <span>Alignment</span>
        {['All', 'Good', 'Bad'].map((item) => (
          <button
            key={item}
            type="button"
            className={alignment === item ? styles.active : ''}
            onClick={() => setAlignment(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <p className={styles.counter}>Showing {filtered} of {total} heroes</p>
    </section>
  );
}

export default FilterBar;
