import { Link } from "react-router-dom";
import PostList from "../../shared/PostList";
import styles from "./Posts.module.css";

export default function Posts(props) {
  const { posts } = props;
  return (
    <section className={styles.posts}>
      <div className={styles.header}>
        <h2>Latest posts</h2>
        <Link to={"/posts"}>See all posts</Link>
      </div>
      <PostList posts={posts} slice={[0, 7]} />
    </section>
  );
}
