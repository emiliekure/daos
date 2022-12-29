import { useEffect, useState } from "react";
import UpdateForm from "./sections/UpdateForm";
import ProfileInfo from "./sections/ProfileInfo";
import MyPosts from "./sections/MyPosts";
import MyEnsembles from "./sections/MyEnsembles";

export default function TheMain({
  posts,
  ensambles,
  fetchPosts,
  fetchEnsambles,
  isLoggedIn,
}) {
  const [userProfile, setUserProfile] = useState(undefined);
  const token = localStorage.getItem("token");
  const loggedUser = JSON.parse(localStorage.getItem("user"));

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

  const getProfile = () => {
    fetch(`http://localhost:3004/profiles/${loggedUser._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("This is the data", response);
        const newDate = formatDate(response.dateOfCreation);
        response.dateOfCreation = newDate;
        localStorage.setItem("user", JSON.stringify(response));
        setUserProfile(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <main>
      {userProfile && (
        <>
          <ProfileInfo userProfile={userProfile} />
          <UpdateForm
            userProfile={userProfile}
            getProfile={getProfile}
            fetchPosts={fetchPosts}
            fetchEnsambles={fetchEnsambles}
            token={token}
            isLoggedIn={isLoggedIn}
          />
          <MyPosts
            posts={posts}
            fetchPosts={fetchPosts}
            userProfile={userProfile}
          />
          <MyEnsembles
            ensambles={ensambles}
            fetchEnsambles={fetchEnsambles}
            userProfile={userProfile}
          />
        </>
      )}
    </main>
  );
}
