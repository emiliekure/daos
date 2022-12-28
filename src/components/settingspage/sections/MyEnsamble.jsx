import styles from "./ProfileCard.module.css";

export default function MyEnsamble({
  style,
  id,
  name,
  creator,
  members,
  description,
  capacity,
  location,
  fetchEnsambles,
}) {
  function handleDelete(ensambleId) {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3004/ensambles/${ensambleId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        fetchEnsambles();
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <div className={style} id={id + "div"}>
        <div className={styles.contentWrapper}>
          <div className={styles.postContent}>
            <h4 className={styles.postTitle}>{name}</h4>
            <div className={styles.postInfo}>
              <div style={{ marginTop: -10, marginBottom: 15 }}>
                <p>{description}</p>
              </div>
              <div className={styles.info}>
                <img src="../img/user-solid.svg" alt="user icon" />
                <p className="post-creator">
                  {creator[0].name + " " + creator[0].surname}
                </p>
              </div>
              <div className={styles.info}>
                <img src="../img/location.svg" alt="music note" />
                <p className="post-instrument">{location}</p>
              </div>
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
        <div className={styles.metaWrapperEnsamble}>
          <p className={styles.postMeta}>
            <button type="button" name="deleteBtn" className={styles.deleteBtn}>
              <img
                id={id}
                src="../img/trash-can.svg"
                alt="trash can"
                onClick={(evt) => handleDelete(evt.target.id)}
              />
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
