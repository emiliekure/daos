import TheHeader from "../components/shared/TheHeader";
import TheMain from "../components/createpostpage/TheMain";
import TheFooter from "../components/shared/TheFooter";
import "./TheMain.css"

export default function CreatePostPage() {
	return (
		<div className="page-wrapper">
			<TheHeader />
			<TheMain />
			<TheFooter />
		</div>
	);
}
