import styles from "./PostItem.module.css";
import Modal from "react-modal";
import { useState } from "react";

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

export default function EnsambleItem({
  style,
  id,
  name,
  creator,
  members,
  slice,
  fetchEnsambles,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");
  const [errorMsg, setErrorMsg] = useState("");
  console.log(members);

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

  function handleAddMember(ensambleId) {
    setErrorMsg("");
    setIsOpen(false);
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (token) {
      if (creator[0]._id === loggedUser._id) {
        setIsOpen(true);
        setErrorMsg("You cannot become a member of an ensamble you created!");
      } else {
        fetch(`http://localhost:3004/ensambles/${ensambleId}/members`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: `{"_id": ${JSON.stringify(loggedUser._id)} }`,
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            fetchEnsambles();
          })
          .catch((err) => {
            console.error(err);
            setErrorMsg("You are already a member of this ensamble!");
            setIsOpen(true);
            console.log(errorMsg);
          });
      }
    } else {
      setErrorMsg(
        "You have to be logged into your DAOS account to join our ensambles."
      );
      setIsOpen(true);
      console.log(errorMsg);
    }
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
              {name}
            </h4>
            <div
              className={styles.postInfo}
              onClick={() => handleOpenModal(true)}
            >
              <img src="../img/user-solid.svg" alt="user icon" />
              <p className="post-creator">
                {creator[0].name + " " + creator[0].surname}
              </p>
              <img src="../img/music-solid.svg" alt="music note" />
              <p className="post-instrument">
                Ensamble members:
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 10,
                  }}
                >
                  {members.length === 0 ? (
                    <p>This ensamble has no members as of yet</p>
                  ) : (
                    members.map((member) => {
                      return (
                        <p>
                          {member.name + " " + member.surname} - plays{" "}
                          {member.instrument}
                        </p>
                      );
                    })
                  )}
                </div>
              </p>
            </div>
          </div>
          <div className={styles.postIcon}>
            <img src="../img/instruments.svg" alt="instrument icon" />
          </div>
        </div>
        <div className={styles.metaWrapper}>
          <p className={styles.postMeta}>
            <button
              type="button"
              name="joinBtn"
              id={id}
              onClick={(evt) => handleAddMember(evt.target.id)}
            >
              JOIN
            </button>
          </p>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Example Modal"
        style={customStyles}
        shouldCloseOnOverlayClick
      >
        <p>{errorMsg}</p>
      </Modal>
    </>
  );
}
