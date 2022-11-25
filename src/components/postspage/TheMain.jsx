import Feedback from "../shared/Feedback";
import AllPosts from "./sections/AllPosts";

export default function TheMain({ posts, fetchPosts }) {
  return (
    <main>
      <AllPosts posts={posts} fetchPosts={fetchPosts} />
      <Feedback />
    </main>
  );
}
