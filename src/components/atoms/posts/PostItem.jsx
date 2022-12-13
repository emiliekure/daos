import styles from "./PostItem.module.css";
import PostItemModal from "./PostItemModal";
import Modal from "react-modal";
import { useState } from "react";
import UnauthorisedModal from "./UnauthorisedModal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: 0,
  },
};

export default function PostItem({
  style,
  id,
  title,
  author,
  authorId,
  instrument,
  searchType,
  date,
  location,
  slice,
  description,
  fetchPosts,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");

  function handleOpenModal(bool) {
    setIsOpen(bool);
    console.log(token);

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      console.log(isLoggedIn);
    }
  }

  function handleDelete(postId) {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (token) {
      if (authorId === loggedUser._id) {
        fetch(`http://localhost:3004/posts/${postId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            fetchPosts();
          })
          .catch((err) => console.error(err));
      } else {
        console.log("You are not the creator of this post!");
      }
    } else {
      console.log(
        "You have to be logged into your DAOS account for further editing actions."
      );
    }
  }
  Modal.setAppElement("main");
  return (
    <>
      <div className={style} id={id + "div"}>
        <div className={styles.contentWrapper}>
          <div className={styles.postContent}>
            {slice.length === 0 && (
              <button
                type="button"
                name="deleteBtn"
                id={id}
                onClick={(evt) => handleDelete(evt.target.id)}
              >
                DELETE
              </button>
            )}
            <h4
              className={styles.postTitle}
              onClick={() => handleOpenModal(true)}
            >
              {title}
            </h4>
            <div
              className={styles.postInfo}
              onClick={() => handleOpenModal(true)}
            >
              <img src="../img/user-solid.svg" alt="user icon" />
              <p className="post-author">{author}</p>
              <img src="../img/music-solid.svg" alt="music note" />
              <p className="post-instrument">
                {instrument} ({searchType})
              </p>
            </div>
          </div>
          <div className={styles.postIcon}>
            <img src="../img/instruments.svg" alt="instrument icon" />
          </div>
        </div>
        <div className={styles.metaWrapper}>
          <p className={styles.postMeta}>
            {date} &sdot; {location}
          </p>
        </div>
      </div>

      {slice.length === 0 && (
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          contentLabel="Example Modal"
          style={customStyles}
          shouldCloseOnOverlayClick
        >
          {isLoggedIn ? (
            <PostItemModal
              style={style}
              id={id}
              title={title}
              author={author}
              instrument={instrument}
              searchType={searchType}
              date={date}
              location={location}
              description={description}
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <UnauthorisedModal
              style={styles}
              onClick={() => setIsOpen(false)}
            ></UnauthorisedModal>
          )}
        </Modal>
      )}
    </>
  );
}
