import TheHeader from "./components/TheHeader"
import TheMain from "./components/TheMain"
import TheFooter from "./components/TheFooter"
import './App.css'

function App() {
	return (
		<div className="page-wrapper">
			<TheHeader />
			<TheMain />
			<TheFooter />
		</div>
	);
}

export default App;
