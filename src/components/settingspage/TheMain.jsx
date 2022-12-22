import { useEffect, useState } from "react";
import UpdateForm from "./sections/UpdateForm";
import ProfileInfo from "./sections/ProfileInfo";

export default function TheMain({ posts, ensambles }) {
  const [userProfile, setUserProfile] = useState(undefined);
  const token = localStorage.getItem("token");
  const loggedUser = JSON.parse(localStorage.getItem("user"));

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
            token={token}
          />
        </>
      )}
      {/*  <MyPosts posts={posts} />
      <MyEnsembles ensambles={ensambles} /> */}
    </main>
  );
}
