import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage.jsx";
import PostsPage from "./pages/PostsPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CreatePostPage from "./pages/CreatePostPage.jsx";
import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3004/posts`)
      .then((response) => response.json())
      .then((postData) => {
        setPosts(postData);
        console.log(postData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage posts={posts} />} exact />
        <Route path="/posts" element={<PostsPage posts={posts} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/createpost" element={<CreatePostPage />} />
      </Routes>
    </>
  );
}

export default App;
