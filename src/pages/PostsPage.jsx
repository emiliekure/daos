import TheHeader from "../components/shared/TheHeader";
import TheMain from "../components/postspage/TheMain";
import TheFooter from "../components/shared/TheFooter";
import "./TheMain.css";

export default function PostsPage({
  posts,
  ensambles,
  fetchPosts,
  fetchEnsambles,
  isLoggedIn,
  setIsLoggedIn,
  searchTerm,
  setSearchTerm,
  sortTerm,
  setSortTerm,
  instrumentSelect,
  setInstrumentSelect,
}) {
  return (
    <div className="page-wrapper">
      <TheHeader isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <TheMain
        posts={posts}
        ensambles={ensambles}
        fetchPosts={fetchPosts}
        fetchEnsambles={fetchEnsambles}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortTerm={sortTerm}
        setSortTerm={setSortTerm}
        instrumentSelect={instrumentSelect}
        setInstrumentSelect={setInstrumentSelect}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <TheFooter />
    </div>
  );
}
