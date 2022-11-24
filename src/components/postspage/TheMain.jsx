import Feedback from "../shared/Feedback";
import AllPosts from "./sections/AllPosts";

export default function TheMain(props) {
  const { posts } = props;
  return (
    <main>
      <AllPosts posts={posts} />
      <Feedback />
    </main>
  );
}
