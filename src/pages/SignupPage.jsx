import TheHeader from "../components/shared/TheHeader";
import TheMain from "../components/signuppage/TheMain";
import TheFooter from "../components/shared/TheFooter";
import "./TheMain.css";

export default function SignupPage({ isLoggedIn, setIsLoggedIn }) {
  return (
    <div className="page-wrapper">
      <TheHeader isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <TheMain />
      <TheFooter />
    </div>
  );
}
