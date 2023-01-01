import TheHeader from "../components/shared/TheHeader";
import TheMain from "../components/createpostpage/TheMain";
import TheFooter from "../components/shared/TheFooter";
import "./TheMain.css";

export default function CreatePostPage({ isLoggedIn, setIsLoggedIn }) {
  return (
    <div className="page-wrapper">
      <TheHeader isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <TheMain isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <TheFooter />
    </div>
  );
}
