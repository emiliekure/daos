import PostList from "../../shared/PostList";
import styles from "../../postspage/sections/AllPosts.module.css";
import MyPostList from "./MyPostList";

export default function MyPosts({ posts, fetchPosts, userProfile }) {
  return (
    <section className={styles.allPosts}>
      <div className={styles.header}>
        <h1>Your Posts</h1>
        <p id="resultCounter"></p>
        <MyPostList
          posts={posts.filter((item) => {
            if (item.author[0]._id.includes(userProfile._id)) {
              return item;
            }
          })}
          fetchPosts={fetchPosts}
          userProfile={userProfile}
        />
      </div>
    </section>
  );
}
