import PostList from "../../shared/PostList";
import styles from "./AllPosts.module.css";
import InstrumentFilterSelect from "./shared/InstrumentFilterSelect";
import SearchField from "./shared/SearchField";

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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: 50,
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <SearchField
              name="search"
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

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 20,
              marginTop: 25,
            }}
          >
            <div className={styles.radiolabel}>
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
            <div className={styles.radiolabel}>
              <input
                name="sort-type"
                id="wanted"
                type={"radio"}
                value={"wanted"}
                required
                onClick={(evt) => setSortTerm(evt.target.value)}
              />
              <label htmlFor="wanted">Looking for an ensamble?</label>
            </div>
            <div className={styles.radiolabel}>
              <input
                name="sort-type"
                id="offered"
                type={"radio"}
                value={"offered"}
                required
                onClick={(evt) => setSortTerm(evt.target.value)}
              />
              <label htmlFor="wanted">Looking for a musician?</label>
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
