import PostAll from "../atoms/posts/PostAll";
import PostItem from "../atoms/posts/PostItem";
import styles from "./PostList.module.css";

export default function PostList({slice}) {
	const posts = [
		{
			_id: 1,
			title: "Dummy title 1",
			author: "Thor Odinson",
			instrument: "Tuba",
			searchType: "Wanted",
			date: "2022-12-23T03:15:03Z",
			location: "Helsingør, Sjælland",
		},
		{
			_id: 2,
			title: "Dummy title 2",
			author: "Loki Odinson",
			instrument: "Flute",
			searchType: "Offered",
			date: "2022-04-17T05:01:56Z",
			location: "Fyn",
		},
		{
			_id: 3,
			title: "Dummy title 3 but a long one to check multiple lines",
			author: "Odin I Guess",
			instrument: "Harp",
			searchType: "Wanted",
			date: "2022-11-18T07:37:06Z",
			location: "Somewhere in dark Jutland",
		},
		{
			_id: 4,
			title: "Dummy title 4",
			author: "Odin I Guess",
			instrument: "Harp",
			searchType: "Wanted",
			date: "2022-11-18T07:37:06Z",
			location: "Somewhere in dark Jutland",
		},
		{
			_id: 5,
			title: "Dummy title 5",
			author: "Odin I Guess",
			instrument: "Harp",
			searchType: "Wanted",
			date: "2022-11-18T07:37:06Z",
			location: "Somewhere in dark Jutland",
		},
		{
			_id: 6,
			title: "Dummy title 6 but a long one to check multiple lines",
			author: "Odin I Guess",
			instrument: "Harp",
			searchType: "Wanted",
			date: "2022-11-18T07:37:06Z",
			location: "Somewhere in dark Jutland",
		},
		{
			_id: 7,
			title: "Dummy title 7 but a long one to check multiple lines",
			author: "Odin I Guess",
			instrument: "Harp",
			searchType: "Wanted",
			date: "2022-11-18T07:37:06Z",
			location: "Somewhere in dark Jutland",
		},
		{
			_id: 8,
			title: "Dummy title 8 but a long one to check multiple lines",
			author: "Odin I Guess",
			instrument: "Harp",
			searchType: "Wanted",
			date: "2022-11-18T07:37:06Z",
			location: "Somewhere in dark Jutland",
		},
		{
			_id: 9,
			title: "Dummy title 9 but a long one to check multiple lines",
			author: "Odin I Guess",
			instrument: "Harp",
			searchType: "Wanted",
			date: "2022-11-18T07:37:06Z",
			location: "Somewhere in dark Jutland",
		},
		{
			_id: 10,
			title: "Dummy title 10",
			author: "Odin I Guess",
			instrument: "Harp",
			searchType: "Wanted",
			date: "2022-11-18T07:37:06Z",
			location: "Somewhere in dark Jutland",
		}
	];

	return (
		<div className={styles.postlist}>
			{posts.slice(slice[0], slice[1]).map((post) => {
				return (
					<PostItem
						style={styles.card}
						key={post._id}
						id={post._id}
						title={post.title}
						author={post.author}
						instrument={post.instrument}
						searchType={post.searchType}
						date={post.date}
						location={post.location}
					/>
				);
			})}
			{!slice.length == 0 && <PostAll cardStyle={styles.card} idStyle={styles.allPostsLink} />}
			
		</div>
	);
}
