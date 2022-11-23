import PostList from "../../shared/PostList";
import styles from "./AllPosts.module.css";

export default function AllPosts() {
	return (
		<section className={styles.allPosts}>
			<div className={styles.header}>
				<h1>Posts</h1>
				<p id="resultCounter"></p>
			</div>
			<PostList slice={[]} />
		</section>
	)
}