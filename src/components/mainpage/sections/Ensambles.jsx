import { Link } from "react-router-dom";
import EnsambleList from "../../shared/EnsambleList";
import styles from "./Posts.module.css";

export default function Ensambles({ ensambles, fetchEnsambles }) {
  return (
    <section className={styles.posts}>
      <div className={styles.header}>
        <h2>Recent ensambles</h2>
        <Link to={"/posts"}>See all ensambles</Link>
      </div>
      <EnsambleList
        ensambles={ensambles}
        fetchEnsambles={fetchEnsambles}
        slice={[0, 2]}
      />
    </section>
  );
}
