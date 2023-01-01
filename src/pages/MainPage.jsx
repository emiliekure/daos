import TheHeader from "../components/shared/TheHeader";
import TheMain from "../components/mainpage/TheMain";
import TheFooter from "../components/shared/TheFooter";
import "./TheMain.css";

export default function MainPage({
  posts,
  ensambles,
  instrumentSelect,
  setInstrumentSelect,
  fetchPosts,
  fetchEnsambles,
  isLoggedIn,
  setIsLoggedIn,
}) {
  return (
    <div className="page-wrapper">
      <TheHeader isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <TheMain
        posts={posts}
        ensambles={ensambles}
        instrumentSelect={instrumentSelect}
        setInstrumentSelect={setInstrumentSelect}
        fetchPosts={fetchPosts}
        fetchEnsambles={fetchEnsambles}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <TheFooter />
    </div>
  );
}
