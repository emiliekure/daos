import styles from "../../shared/PostList.module.css";
import ProfileCard from "./ProfileCard";

export default function ProfileInfo({ userProfile }) {
  return (
    <section>
      <ProfileCard
        style={styles.card}
        id={userProfile._id}
        title={"Your profile info"}
        name={userProfile.name}
        surname={userProfile.surname}
        instrument={userProfile.instrument}
        email={userProfile.email}
        date={userProfile.dateOfCreation}
      />
    </section>
  );
}
