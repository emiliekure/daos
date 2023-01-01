import { useEffect, useState } from "react";
import MyPost from "./MyPost";
import styles from "../../shared/PostList.module.css";

export default function MyPostList({ posts, fetchPosts, userProfile }) {
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className={styles.postlist}>
      {posts.map((post) => {
        return (
          <>
            <MyPost
              style={styles.card}
              id={post._id}
              title={post.title}
              author={post.author}
              authorId={post.authorId}
              instrument={post.instrument}
              searchType={post.searchType}
              date={post.dateOfCreation}
              location={post.location}
              description={post.description}
              fetchPosts={fetchPosts}
            />
          </>
        );
      })}
    </div>
  );
}
