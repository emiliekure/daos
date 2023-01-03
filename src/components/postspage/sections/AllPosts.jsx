import PostList from "../../shared/PostList";
import styles from "./AllPosts.module.css";
import InstrumentFilterSelect from "../../atoms/forms/InstrumentFilterSelect";
import SearchField from "../../atoms/forms/SearchField";

export default function AllPosts({
  posts,
  fetchPosts,
  isLoggedIn,
  setIsLoggedIn,
  searchTerm,
  setSearchTerm,
  instrumentSelect,
  setInstrumentSelect,
  sortTerm,
  setSortTerm,
}) {
  return (
    <section className={styles.allPosts}>
      <div className={styles.header}>
        <h1>Posts</h1>
        <p id="resultCounter"></p>
        <div className={styles.filters}>
          <div className={styles.filterFields}>
            <SearchField
              type="search"
              max="120"
              placeholder="Search for location"
              value={searchTerm}
              onChange={(evt) => setSearchTerm(evt.target.value)}
            />
            <InstrumentFilterSelect
              name="instrument"
              value={instrumentSelect}
              onChange={(evt) => setInstrumentSelect(evt.target.value)}
            />
          </div>

          <div className={styles.filterTabs}>
            <h3>Post-type</h3>
            <div className={styles.filterButtons}>
              <div className={styles.filterTab}>
                <input
                  name="sort-type"
                  id="all"
                  type={"radio"}
                  value={"all"}
                  required
                  defaultChecked
                  onClick={(evt) => setSortTerm(evt.target.value)}
                />
                <label htmlFor="all">All</label>
              </div>
              <div className={styles.filterTab}>
                <input
                  name="sort-type"
                  id="wanted"
                  type={"radio"}
                  value={"wanted"}
                  required
                  onClick={(evt) => setSortTerm(evt.target.value)}
                />
                <label htmlFor="wanted">Find ensembles</label>
              </div>
              <div className={styles.filterTab}>
                <input
                  name="sort-type"
                  id="offered"
                  type={"radio"}
                  value={"offered"}
                  required
                  onClick={(evt) => setSortTerm(evt.target.value)}
                />
                <label htmlFor="offered">Find musicians</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PostList
        posts={posts}
        fetchPosts={fetchPosts}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        searchTerm={searchTerm}
        instrumentFilter={instrumentSelect}
        sortTerm={sortTerm}
        slice={[]}
      />
    </section>
  );
}
