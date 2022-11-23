import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage.jsx";
import PostsPage from "./pages/PostsPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CreatePostPage from "./pages/CreatePostPage.jsx";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<MainPage />} exact />
				<Route path="/posts" element={<PostsPage />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/createpost" element={<CreatePostPage />} />
			</Routes>
		</>
	);
}

export default App;
