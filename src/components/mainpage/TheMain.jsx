import Feedback from "../shared/Feedback"
import Hero from "./sections/Hero"
import Posts from "./sections/Posts"

export default function TheMain() {
	return(
		<main>
			<Hero />
			<Posts />
			<Feedback />
		</main>
	)
}