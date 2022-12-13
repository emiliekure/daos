import Feedback from "../shared/Feedback";
import AllEnsambles from "./sections/AllEnsambles";
import AllPosts from "./sections/AllPosts";

export default function TheMain({
  posts,
  ensambles,
  fetchPosts,
  fetchEnsambles,
}) {
  return (
    <main>
      <AllPosts posts={posts} fetchPosts={fetchPosts} />
      <AllEnsambles ensambles={ensambles} fetchEnsambles={fetchEnsambles} />
      <Feedback />
    </main>
  );
}
