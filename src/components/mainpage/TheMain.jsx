import Feedback from "../shared/Feedback";
import Hero from "./sections/Hero";
import Posts from "./sections/Posts";

export default function TheMain(props) {
  const { posts } = props;
  return (
    <main>
      <Hero />
      <Posts posts={posts} />
      <Feedback />
    </main>
  );
}
