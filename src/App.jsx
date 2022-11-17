import TheHeader from "./components/TheHeader";
import TheMain from "./components/TheMain";
import TheFooter from "./components/TheFooter";
import "./App.css";
import TheSignUp from "./components/TheSignUp";
import ThePost from "./components/ThePost";
import TheLogin from "./components/TheLogin";

function App() {
  return (
    <div className="page-wrapper">
      {/* <TheLogin /> */}
      {/* <TheSignUp /> */}
      <ThePost />
      {/* <TheHeader />
			<TheMain />
			<TheFooter /> */}
    </div>
  );
}

export default App;
