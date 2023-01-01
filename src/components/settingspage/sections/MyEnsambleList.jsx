import { useEffect, useState } from "react";
import styles from "../../shared/PostList.module.css";
import MyEnsamble from "./MyEnsamble";

export default function MyEnsambleList({
  ensambles,
  fetchEnsambles,
  userProfile,
}) {
  useEffect(() => {
    fetchEnsambles();
  }, []);

  return (
    <div className={styles.postlist}>
      {ensambles.map((ensamble) => {
        return (
          <>
            <MyEnsamble
              style={styles.card}
              id={ensamble._id}
              name={ensamble.name}
              creator={ensamble.creator}
              location={ensamble.location}
              description={ensamble.description}
              capacity={ensamble.capacity}
              members={ensamble.members.map((member) => member)}
              fetchEnsambles={fetchEnsambles}
              userProfile={userProfile}
            />
          </>
        );
      })}
    </div>
  );
}
