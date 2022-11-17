import PostList from "../../shared/PostList";
import styles from "./AllPosts.module.css";

export default function AllPosts() {
	return (
		<section className={styles.allPosts}>
			<div className={styles.header}>
				<h1>Posts</h1>
			</div>
			<PostList />
		</section>
	)
}