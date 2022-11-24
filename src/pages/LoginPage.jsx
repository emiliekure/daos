import TheHeader from "../components/shared/TheHeader";
import TheMain from "../components/loginpage/TheMain";
import TheFooter from "../components/shared/TheFooter";
import "./TheMain.css";

export default function LoginPage() {
  return (
    <div className="page-wrapper">
      <TheHeader />
      <TheMain />
      <TheFooter />
    </div>
  );
}
