import { useEffect, useState } from "react";
import SeeAll from "../atoms/posts/SeeAll";
import PostItem from "../atoms/posts/PostItem";
import styles from "./PostList.module.css";

export default function PostList({
  slice,
  posts,
  fetchPosts,
  isLoggedIn,
  setIsLoggedIn,
  searchTerm,
  instrumentFilter,
  sortTerm,
}) {
  useEffect(() => {
    fetchPosts();
  }, []);

  console.log(sortTerm);
  return (
    <div className={styles.postlist}>
      {posts
        .slice(slice[0], slice[1])
        .filter((item) => {
          if (slice.length == 0) {
            if (sortTerm === "" || sortTerm === "all") {
              return item;
            } else if (item.searchType.toLowerCase().includes(sortTerm)) {
              return item;
            }
          } else {
            return item;
          }
        })
        .filter((item) => {
          if (slice.length == 0) {
            if (searchTerm === "") {
              return item;
            } else if (
              item.location.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return item;
            }
          } else {
            return item;
          }
        })
        .filter((item) => {
          if (slice.length == 0) {
            if (
              instrumentFilter === "" ||
              instrumentFilter === "All instruments"
            ) {
              return item;
            } else if (
              item.instrument
                .toLowerCase()
                .includes(instrumentFilter.toLowerCase()) ||
              item.instrument.toLowerCase().includes("All instruments")
            ) {
              return item;
            }
          } else {
            return item;
          }
        })
        .map((post) => {
          return (
            <>
              <PostItem
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
                slice={slice}
                fetchPosts={fetchPosts}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            </>
          );
        })}
      {!slice.length == 0 && (
        <SeeAll
          postSection={true}
          cardStyle={styles.card}
          idStyle={styles.allPostsLink}
        />
      )}
    </div>
  );
}
