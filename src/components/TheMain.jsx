import Hero from "./sections/Hero"
import Posts from "./sections/Posts"
import "./TheMain.module.css"

export default function TheMain() {
	return(
		<main>
			<Hero />
			<Posts />
		</main>
	)
}