import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage.jsx";
import PostsPage from "./pages/PostsPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CreatePostPage from "./pages/CreatePostPage.jsx";
import { useEffect, useState } from "react";
import CreateEnsamblePage from "./pages/CreateEnsamblePage";

function App() {
  const [posts, setPosts] = useState([]);
  const [ensambles, setEnsambles] = useState([]);

  function formatDate(dbDate) {
    const nth = function (d) {
      if (d > 3 && d < 21) return "th";
      switch (d % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    const dateObj = new Date(dbDate);

    const date = dateObj.getDate();
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][dateObj.getMonth()];

    const dateString = month + " " + date + nth(date);
    return dateString;
  }

  const fetchPosts = () => {
    fetch(`http://localhost:3004/posts`)
      .then((response) => response.json())
      .then((postData) => {
        for (let date of postData) {
          const newDate = formatDate(date.dateOfCreation);
          date.dateOfCreation = newDate;
        }
        setPosts(postData);
        console.log(postData);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchEnsambles = () => {
    fetch("http://localhost:3004/ensambles")
      .then((response) => response.json())
      .then((ensambleData) => {
        console.log(ensambleData);
        setEnsambles(ensambleData);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchEnsambles();
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              posts={posts}
              ensambles={ensambles}
              fetchPosts={fetchPosts}
              fetchEnsambles={fetchEnsambles}
            />
          }
          exact
        />
        <Route
          path="/posts"
          element={
            <PostsPage
              posts={posts}
              ensambles={ensambles}
              fetchPosts={fetchPosts}
              fetchEnsambles={fetchEnsambles}
            />
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/createpost" element={<CreatePostPage />} />
        <Route path="/createensamble" element={<CreateEnsamblePage />} />
      </Routes>
    </>
  );
}

export default App;
