import Feedback from "../shared/Feedback"
import AllPosts from "./sections/AllPosts"

export default function TheMain() {
	return(
		<main>
			<AllPosts />
			<Feedback />
		</main>
	)
}