import TheHeader from "../components/shared/TheHeader";
import TheMain from "../components/settingspage/TheMain";
import TheFooter from "../components/shared/TheFooter";
import "./TheMain.css";

export default function SettingsPage({ posts, ensambles }) {
  return (
    <div className="page-wrapper">
      <TheHeader />
      <TheMain posts={posts} ensambles={ensambles} />
      <TheFooter />
    </div>
  );
}
