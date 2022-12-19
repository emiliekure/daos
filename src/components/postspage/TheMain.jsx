import { useState } from "react";
import Feedback from "../shared/Feedback";
import AllEnsambles from "./sections/AllEnsambles";
import AllPosts from "./sections/AllPosts";

export default function TheMain({
  posts,
  ensambles,
  fetchPosts,
  fetchEnsambles,
  isLoggedIn,
  setIsLoggedIn,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [instrumentSelect, setInstrumentSelect] = useState("");
  const [sortTerm, setSortTerm] = useState("");
  return (
    <main>
      <AllPosts
        posts={posts}
        fetchPosts={fetchPosts}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        instrumentSelect={instrumentSelect}
        setInstrumentSelect={setInstrumentSelect}
        sortTerm={sortTerm}
        setSortTerm={setSortTerm}
      />
      <AllEnsambles
        ensambles={ensambles}
        fetchEnsambles={fetchEnsambles}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Feedback />
    </main>
  );
}
