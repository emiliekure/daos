import Feedback from "../shared/Feedback";
import Hero from "./sections/Hero";
import Posts from "./sections/Posts";
import Ensambles from "./sections/Ensambles";

export default function TheMain({
  posts,
  ensambles,
  fetchPosts,
  fetchEnsambles,
}) {
  console.log(ensambles);
  return (
    <main>
      <Hero />
      <Posts posts={posts} fetchPosts={fetchPosts} />
      <Ensambles ensambles={ensambles} fetchEnsambles={fetchEnsambles} />
      <Feedback />
    </main>
  );
}
