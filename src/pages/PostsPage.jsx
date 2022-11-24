import TheHeader from "../components/shared/TheHeader";
import TheMain from "../components/postspage/TheMain";
import TheFooter from "../components/shared/TheFooter";
import "./TheMain.css";

export default function PostsPage(props) {
  const { posts } = props;
  return (
    <div className="page-wrapper">
      <TheHeader />
      <TheMain posts={posts} />
      <TheFooter />
    </div>
  );
}
