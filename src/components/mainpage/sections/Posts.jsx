import PostList from "../../shared/PostList";
import styles from "./Posts.module.css";

export default function Posts() {
	return (
		<section className={styles.posts}>
			<div className={styles.header}>
				<h2>Latest posts</h2>
				<a href="#">See all posts</a>
			</div>
			<PostList sliceStart={0} sliceEnd={7} />
		</section>
	);
}
