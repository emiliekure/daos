import TheHeader from "../components/shared/TheHeader";
import TheMain from "../components/createensamblepage/TheMain";
import TheFooter from "../components/shared/TheFooter";
import "./TheMain.css";

export default function CreateEnsamblePage({ isLoggedIn, setIsLoggedIn }) {
  return (
    <div className="page-wrapper">
      <TheHeader />
      <TheMain isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <TheFooter />
    </div>
  );
}
