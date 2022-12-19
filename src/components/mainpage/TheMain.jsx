import Feedback from "../shared/Feedback";
import Hero from "./sections/Hero";
import Posts from "./sections/Posts";
import Ensambles from "./sections/Ensambles";

export default function TheMain({
  posts,
  ensambles,
  fetchPosts,
  fetchEnsambles,
  isLoggedIn,
  setIsLoggedIn,
}) {
  return (
    <main>
      <Hero />
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
