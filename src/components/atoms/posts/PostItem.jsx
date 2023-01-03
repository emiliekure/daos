import styles from "./PostItem.module.css";
import PostItemModal from "./PostItemModal";
import Modal from "react-modal";
import { useState } from "react";
import UnauthorisedModal from "./UnauthorisedModal";
import ApproveDeleteModal from "./ApproveDeleteModal";

export default function PostItem({
  style,
  id,
  title,
  author,
  instrument,
  searchType,
  date,
  location,
  slice,
  description,
  fetchPosts,
  isLoggedIn,
  setIsLoggedIn,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const token = localStorage.getItem("token");
  const [approveDelete, setApproveDelete] = useState(false);

  function handleOpenModal(bool) {
    setIsOpen(bool);

    if (token) {
      setIsLoggedIn(true);
      setErrorMsg("");
    } else {
      setIsLoggedIn(false);
      setErrorMsg(
        "To be able to see full description of the post, please login to your DAOS account or create a profile on our signup page."
      );
    }
  }

  function handleApproveDelete() {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (token) {
      setIsLoggedIn(true);
      if (author[0]._id === loggedUser._id) {
        setErrorMsg("");
        setApproveDelete(true);
        setIsOpen(false);
        console.log(approveDelete);
      } else {
        setIsOpen(true);
        setErrorMsg(
          "You are not the creator of this post, thus you are not authorised to delete this post."
        );
      }
    } else {
      setIsOpen(true);
      setIsLoggedIn(false);
      setErrorMsg(
        "You have to be logged into your DAOS account for further editing actions."
      );
    }
  }

  function handleDelete(postId) {
    setErrorMsg("");
    fetch(`http://localhost:3004/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setApproveDelete(false);
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
          {slice.length === 0 && (
            <button type="button" name="deleteBtn" className={styles.deleteBtn}>
              <img
                id="deleteTrashCan"
                src="../img/trash-can.svg"
                alt="trash can"
                onClick={() => handleApproveDelete()}
              />
            </button>
          )}
        </div>
      </div>

      {slice.length === 0 && (
        <>
          <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            contentLabel="Example Modal"
            shouldCloseOnOverlayClick
          >
            {!errorMsg ? (
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
                style={style}
                onClick={() => setIsOpen(false)}
                errorMsg={errorMsg}
                isLoggedIn={isLoggedIn}
                title="Unauthorised action"
              ></UnauthorisedModal>
            )}
          </Modal>
          <Modal
            isOpen={approveDelete}
            onRequestClose={() => setApproveDelete(false)}
            contentLabel="Example Modal"
            shouldCloseOnOverlayClick
          >
            <ApproveDeleteModal
              style={style}
              setApproveDelete={() => setApproveDelete(false)}
              handleDelete={handleDelete}
              id={id}
              post
            />
          </Modal>
        </>
      )}
    </>
  );
}
