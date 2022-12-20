import EnsambleList from "../../shared/EnsambleList";
import styles from "./AllPosts.module.css";

export default function AllEnsambles({
  ensambles,
  fetchEnsambles,
  isLoggedIn,
  setIsLoggedIn,
}) {
  return (
    <section className={styles.allPosts}>
      <div className={styles.header}>
        <h1>Ensambles</h1>
        <p id="resultCounter"></p>
      </div>
      <EnsambleList
        ensambles={ensambles}
        fetchEnsambles={fetchEnsambles}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        slice={[]}
      />
    </section>
  );
}
