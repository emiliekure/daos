import TheHeader from "../components/shared/TheHeader";
import TheMain from "../components/mainpage/TheMain";
import TheFooter from "../components/shared/TheFooter";
import "./TheMain.css";

export default function MainPage({ posts, fetchPosts }) {
  return (
    <div className="page-wrapper">
      <TheHeader />
      <TheMain posts={posts} fetchPosts={fetchPosts} />
      <TheFooter />
    </div>
  );
}
