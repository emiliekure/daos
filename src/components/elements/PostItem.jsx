import "./PostItem.css";

export default function PostItem({id, title, author, instrument, searchType, date, location}) {
	return (
		<div className="card" id={id}>
			<div className="content-wrapper">
				<div className="post-content">
					<h4 className="post-title">{title}</h4>
					<div className="post-info">
						<img src="../img/user-solid.svg" alt="user icon" />
						<p className="post-author">{author}</p>
						<img src="../img/music-solid.svg" alt="music note" />
						<p className="post-instrument">{instrument} ({searchType})</p>
					</div>
				</div>
				<div className="post-icon">
					<img src="../img/instruments.svg" alt="instrument icon" />
				</div>
			</div>
			<div className="meta-wrapper">
				<p className="post-meta">{date} &sdot; {location}</p>
			</div>
		</div>
	);
}
