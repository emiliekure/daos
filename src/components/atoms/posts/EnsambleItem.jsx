import styles from "./PostItem.module.css";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import UnauthorisedModal from "./UnauthorisedModal";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";

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
  description,
  location,
  capacity,
  fetchEnsambles,
  isLoggedIn,
  setIsLoggedIn,
  slice,
  email,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [errorMsg, setErrorMsg] = useState("");
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const [isAMember, setIsAMember] = useState(undefined);

  useEffect(() => {
    if (loggedUser) {
      if (members.length === 0) setIsAMember(false);
      members.filter((member) => {
        if (member._id.includes(loggedUser._id)) {
          console.log(loggedUser._id);
          return setIsAMember(true);
        } else {
          return setIsAMember(false);
        }
      });
    } else {
      setIsAMember(false);
    }
  }, [members, loggedUser]);

  function handleAddMember(ensambleId) {
    setErrorMsg("");
    setIsOpen(false);
    if (token) {
      setIsLoggedIn(true);
      if (creator[0]._id === loggedUser._id) {
        setIsOpen(true);
        setErrorMsg("You cannot become a member of an ensamble you created!");
      } else {
        console.log(members.length);
        if (members.length === Number(capacity)) {
          setErrorMsg(
            `The maximum capacity of this ensemble is ${capacity} has been reached - all the places are filled. For possible vacancies, please contact the ensamble directly.`
          );
          setIsOpen(true);
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
              if (response.statusCode === 403) {
                setErrorMsg(response.message);
                setIsOpen(true);
              }
              fetchEnsambles();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    } else {
      setIsLoggedIn(false);
      setErrorMsg(
        "You have to be logged into your DAOS account to join our ensambles."
      );
      setIsOpen(true);
    }
  }

  function handleRemoveMember(ensambleId) {
    setErrorMsg("");
    fetch(
      `http://localhost:3004/ensambles/${ensambleId}/members/${loggedUser._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        fetchEnsambles();
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg(
          "There has been a problem with removing you from the ensemble."
        );
        setIsOpen(true);
      });
  }
  Modal.setAppElement("main");
  return (
    <>
      <div className={style} id={id + "div"}>
        <div className={styles.contentWrapper}>
          <div className={styles.postContent}>
            <h4 className={styles.postTitle}>{name}</h4>
            <div className={styles.postInfo}>
              {isLoggedIn && (
                <div style={{ marginTop: -10, marginBottom: 15 }}>
                  <p>{description}</p>
                </div>
              )}
              <div className={styles.info}>
                <img src="../img/user-solid.svg" alt="user icon" />
                <p className="post-creator">
                  {creator[0].name + " " + creator[0].surname}
                </p>
              </div>
              {isLoggedIn && (
                <div className={styles.info}>
                  <img src="../img/location.svg" alt="music note" />
                  <p className="post-instrument">{location}</p>
                </div>
              )}
              <div className={styles.info}>
                <img src="../img/music-solid.svg" alt="music note" />
                <p className="post-instrument">Ensamble members:</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: 25,
                  marginTop: -8,
                }}
              >
                {members.length === 0 ? (
                  <p>This ensamble has no members as of yet</p>
                ) : (
                  members.map((member) => {
                    return (
                      <p>
                        {member.name + " " + member.surname} -{" "}
                        {member.instrument === "Conductor" ? "as " : "plays "}
                        {member.instrument.toLowerCase()}
                      </p>
                    );
                  })
                )}
              </div>
            </div>
          </div>
          <div className={styles.postIcon}>
            <img src="../img/instruments.svg" alt="instrument icon" />
          </div>
        </div>
        <div
          className={
            isLoggedIn ? styles.metaWrapper : styles.metaWrapperEnsamble
          }
        >
          {slice.length == 0 && (
            <>
              {isLoggedIn && (
                <SecondaryButton
                  onClick={() => (window.location = `mailto:${email}`)}
                  type="button"
                  text="Contact"
                />
              )}
              <p className={styles.postMeta}>
                {isAMember ? (
                  <PrimaryButton
                    type="button"
                    name="leaveBtn"
                    text="Leave"
                    id={id}
                    onClick={(evt) => handleRemoveMember(evt.target.id)}
                  />
                ) : (
                  <PrimaryButton
                    type="button"
                    name="joinBtn"
                    id={id}
                    onClick={(evt) => handleAddMember(evt.target.id)}
                    text="Join"
                  />
                )}
              </p>
            </>
          )}
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Example Modal"
        style={customStyles}
        shouldCloseOnOverlayClick
      >
        <UnauthorisedModal
          style={styles}
          onClick={() => setIsOpen(false)}
          errorMsg={errorMsg}
          isLoggedIn={isLoggedIn}
        ></UnauthorisedModal>
      </Modal>
    </>
  );
}
