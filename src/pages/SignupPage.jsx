import TheHeader from "../components/shared/TheHeader";
import TheMain from "../components/signuppage/TheMain";
import TheFooter from "../components/shared/TheFooter";
import "./TheMain.css"

export default function SignupPage() {
	return (
		<div className="page-wrapper">
			<TheHeader />
			<TheMain />
			<TheFooter />
		</div>
	);
}
