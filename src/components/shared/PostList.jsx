import { useEffect, useState } from "react";
import PostAll from "../atoms/posts/PostAll";
import PostItem from "../atoms/posts/PostItem";
import styles from "./PostList.module.css";

export default function PostList({ slice, posts, fetchPosts }) {
  useEffect(() => {
    fetchPosts;
  }, []);

  return (
    <div className={styles.postlist}>
      {posts.slice(slice[0], slice[1]).map((post) => {
        return (
          <PostItem
            style={styles.card}
            id={post._id}
            title={post.title}
            author={post.author}
            instrument={post.instrument}
            searchType={post.searchType}
            date={post.dateOfCreation}
            location={post.location}
          />
        );
      })}
      {!slice.length == 0 && (
        <PostAll cardStyle={styles.card} idStyle={styles.allPostsLink} />
      )}
    </div>
  );
}
