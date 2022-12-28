import { useEffect, useState } from "react";
import EnsambleItem from "../atoms/posts/EnsambleItem";
import SeeAll from "../atoms/posts/SeeAll";
import styles from "./PostList.module.css";

export default function EnsambleList({
  slice,
  ensambles,
  fetchEnsambles,
  isLoggedIn,
  setIsLoggedIn,
}) {
  useEffect(() => {
    fetchEnsambles();
  }, []);

  return (
    <div className={styles.postlist}>
      {ensambles.slice(slice[0], slice[1]).map((ensamble) => {
        return (
          <>
            <EnsambleItem
              style={styles.card}
              id={ensamble._id}
              name={ensamble.name}
              creator={ensamble.creator}
              members={ensamble.members.map((member) => member)}
              email={ensamble.email}
              slice={slice}
              fetchEnsambles={fetchEnsambles}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          </>
        );
      })}
      {!slice.length == 0 && (
        <SeeAll
          postSection={false}
          cardStyle={styles.card}
          idStyle={styles.allPostsLink}
        />
      )}
    </div>
  );
}
