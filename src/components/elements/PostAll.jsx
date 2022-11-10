import "./PostAll.css";

export default function PostAll() {
	return (
		<div className="card" id="all-posts-link">
			<a href="#">
				<h3>See all posts</h3>
				<div className="all-icon">
					<img src="../img/instruments.svg" alt="instrument icon" />
				</div>
			</a>
		</div>
	);
}
