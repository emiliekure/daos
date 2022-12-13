import TheHeader from "../components/shared/TheHeader";
import TheMain from "../components/postspage/TheMain";
import TheFooter from "../components/shared/TheFooter";
import "./TheMain.css";

export default function PostsPage({
  posts,
  ensambles,
  fetchPosts,
  fetchEnsambles,
}) {
  return (
    <div className="page-wrapper">
      <TheHeader />
      <TheMain
        posts={posts}
        ensambles={ensambles}
        fetchPosts={fetchPosts}
        fetchEnsambles={fetchEnsambles}
      />
      <TheFooter />
    </div>
  );
}
