import styles from "../../postspage/sections/AllPosts.module.css";
import MyEnsambleList from "./MyEnsambleList";

export default function MyEnsembles({
  ensambles,
  fetchEnsambles,
  userProfile,
}) {
  return (
    <section className={styles.allPosts}>
      <div className={styles.header}>
        <h1>Your Ensembles</h1>
        <p id="resultCounter"></p>
        <MyEnsambleList
          ensambles={ensambles.filter((item) => {
            if (item.creator[0]._id.includes(userProfile._id)) {
              return item;
            }
          })}
          fetchEnsambles={fetchEnsambles}
          userProfile={userProfile}
        />
      </div>
    </section>
  );
}
