import Feedback from "../shared/Feedback";
import Hero from "./sections/Hero";
import Posts from "./sections/Posts";
import Ensambles from "./sections/Ensambles";

export default function TheMain({
  posts,
  ensambles,
  instrumentSelect,
  setInstrumentSelect,
  fetchPosts,
  fetchEnsambles,
  isLoggedIn,
  setIsLoggedIn,
}) {
  return (
    <main>
      <Hero
        instrumentSelect={instrumentSelect}
        setInstrumentSelect={setInstrumentSelect}
      />
      <Posts
        posts={posts}
        fetchPosts={fetchPosts}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Ensambles
        ensambles={ensambles}
        fetchEnsambles={fetchEnsambles}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Feedback />
    </main>
  );
}
