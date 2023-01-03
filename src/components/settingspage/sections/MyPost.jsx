import styles from "./ProfileCard.module.css";
import PostItemModal from "../../atoms/posts/PostItemModal";
import Modal from "react-modal";
import { useState } from "react";

export default function MyPost({
  style,
  id,
  title,
  author,
  instrument,
  searchType,
  date,
  location,
  description,
  fetchPosts,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function handleDelete(postId) {
    const token = localStorage.getItem("token");
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
  }

  Modal.setAppElement("main");
  return (
    <>
      <div className={style} id={id + "div"}>
        <div className={styles.contentWrapper}>
          <div className={styles.postContent}>
            <h4 className={styles.postTitle} onClick={() => setIsOpen(true)}>
              {title}
            </h4>
            <div className={styles.postInfo} onClick={() => setIsOpen(true)}>
              <div className={styles.info}>
                <img src="../img/user-solid.svg" alt="user icon" />
                <p className="post-author">
                  {author[0].name + " " + author[0].surname}
                </p>
              </div>
              <div className={styles.info}>
                <img src="../img/music-solid.svg" alt="music note" />
                <p className="post-instrument">
                  <span style={{ textTransform: "capitalize" }}>
                    {instrument}
                  </span>{" "}
                  ({searchType})
                </p>
              </div>
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
          <button type="button" name="deleteBtn" className={styles.deleteBtn}>
            <img
              id={id}
              src="../img/trash-can.svg"
              alt="trash can"
              onClick={(evt) => handleDelete(evt.target.id)}
            />
          </button>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick
      >
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
      </Modal>
    </>
  );
}
