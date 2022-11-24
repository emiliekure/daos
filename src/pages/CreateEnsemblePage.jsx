import TheHeader from "../components/shared/TheHeader";
import TheMain from "../components/createensemblepage/TheMain";
import TheFooter from "../components/shared/TheFooter";
import "./TheMain.css"

export default function CreateEnsemblePage() {
	return (
		<div className="page-wrapper">
			<TheHeader />
			<TheMain />
			<TheFooter />
		</div>
	);
}
