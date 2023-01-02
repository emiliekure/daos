import styles from "../../postspage/sections/AllPosts.module.css";
import MyEnsambleList from "./MyEnsambleList";

export default function MyEnsembles({
  ensambles,
  fetchEnsambles,
  userProfile,
  token,
}) {
  return (
    <section className={styles.allPosts}>
      <div className={styles.header}>
        <h1>Your Ensembles</h1>
        <p id="resultCounter"></p>
        <MyEnsambleList
          ensambles={ensambles.filter((item) => {
            const capacity = item.members.length;
            if (item.creator[0]._id.includes(userProfile._id)) {
              return item;
            }
            for (var i = 0; i < capacity; i++) {
              if (item.members[i]._id.includes(userProfile._id)) {
                return item;
              }
            }
          })}
          fetchEnsambles={fetchEnsambles}
          userProfile={userProfile}
          token={token}
        />
      </div>
    </section>
  );
}
