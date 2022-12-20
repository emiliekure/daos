import { useState } from "react";
import SecondaryButton from "../../atoms/buttons/SecondaryButton";
import InstrumentSelect from "../../atoms/forms/InstrumentSelect";
import PostList from "../../shared/PostList";
import styles from "./AllPosts.module.css";
import FilterButton from "./shared/FilterButton";
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
  const [clicked, setClicked] = useState(false);
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

          <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <FilterButton
              type={"button"}
              text="All posts"
              value="all"
              onClick={(evt) => setSortTerm(evt.target.value)}
            />
            <FilterButton
              type={"button"}
              text="Looking for a musician"
              value="wanted"
              onClick={(evt) => setSortTerm(evt.target.value)}
            />
            <FilterButton
              type={"button"}
              text="Looking for an ensamble"
              value="offered"
              onClick={(evt) => setSortTerm(evt.target.value)}
            />
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
