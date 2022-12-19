import { useState } from "react";
import SecondaryButton from "../../atoms/buttons/SecondaryButton";
import InstrumentSelect from "../../atoms/forms/InstrumentSelect";
import TextField from "../../atoms/forms/TextField";
import PostList from "../../shared/PostList";
import styles from "./AllPosts.module.css";

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
        <div style={{ display: "flex", flexDirection: "row" }}>
          <TextField
            name="search"
            max="120"
            placeholder=""
            value={searchTerm}
            onChange={(evt) => setSearchTerm(evt.target.value)}
          />
          <InstrumentSelect
            name="instrument"
            value={instrumentSelect}
            onChange={(evt) => setInstrumentSelect(evt.target.value)}
          />

          <SecondaryButton
            type={"button"}
            text="All posts"
            value="all"
            onClick={(evt) => setSortTerm(evt.target.value)}
          />
          <SecondaryButton
            type={"button"}
            text="Looking for a musician"
            value="wanted"
            onClick={(evt) => setSortTerm(evt.target.value)}
          />
          <SecondaryButton
            type={"button"}
            text="Looking for an ensamble"
            value="offered"
            onClick={(evt) => setSortTerm(evt.target.value)}
          />
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
