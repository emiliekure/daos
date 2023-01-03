import styles from "./PostItem.module.css";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import UnauthorisedModal from "./UnauthorisedModal";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import ApproveLeaveModal from "./ApproveLeaveModal ";

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
  const [approveLeave, setApproveLeave] = useState(false);

  useEffect(() => {
    setIsAMember(false);
    if (loggedUser) {
      if (members.length === 0) setIsAMember(false);
      members.filter((member) => {
        if (member._id.includes(loggedUser._id)) {
          setIsAMember(true);
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
            `The maximum capacity of this ensemble - ${capacity} - has been reached - all the places are filled. For possible vacancies, please contact the ensamble directly.`
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
        setApproveLeave(false);
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
                <div className={styles.ensembleDescription}>
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
                <div className={styles.memberList}>
                  <p className="post-instrument">Ensamble members:</p>
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
          </div>
          <div className={styles.postIcon}>
            <img src="../img/instruments.svg" alt="instrument icon" />
          </div>
        </div>
        <div className={styles.metaWrapper}>
          {isLoggedIn && (
            <SecondaryButton
              onClick={() => (window.location = `mailto:${email}`)}
              type="button"
              text="Contact"
            />
          )}
          {slice.length == 0 && (
            <p className={styles.postMeta}>
              {isAMember ? (
                <PrimaryButton
                  type="button"
                  name="leaveBtn"
                  text="Leave"
                  id="removeMember"
                  onClick={() => setApproveLeave(true)}
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
          )}
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick
      >
        <UnauthorisedModal
          style={style}
          onClick={() => setIsOpen(false)}
          errorMsg={errorMsg}
          isLoggedIn={isLoggedIn}
        ></UnauthorisedModal>
      </Modal>
      <Modal
        isOpen={approveLeave}
        onRequestClose={() => setApproveLeave(false)}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick
      >
        <ApproveLeaveModal
          style={styles}
          setApproveLeave={() => setApproveLeave(false)}
          handleRemoveMember={handleRemoveMember}
          id={id}
        />
      </Modal>
    </>
  );
}
