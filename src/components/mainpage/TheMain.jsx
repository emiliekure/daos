import Feedback from "../shared/Feedback";
import Hero from "./sections/Hero";
import Posts from "./sections/Posts";

export default function TheMain({ posts, fetchPosts }) {
  return (
    <main>
      <Hero />
      <Posts posts={posts} fetchPosts={fetchPosts} />
      <Feedback />
    </main>
  );
}
