import PostAll from "../elements/PostAll"
import PostItem from "../elements/PostItem"
import "./Posts.css"

export default function Posts() {
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
		}
	]

	return(
		<section className="posts">
			<div className="header">
				<h2>Latest posts</h2>
				<a href="#">See all posts</a>
			</div>
			<div className="postlist">
				{posts.map((post) => {
					return (
						<PostItem 
							id={post._id}
							title={post.title}
							author={post.author}
							instrument={post.instrument}
							searchType={post.searchType}
							date={post.date}
							location={post.location}
						/>
					)
				})}
				<PostAll />
			</div>
		</section>
	)
}