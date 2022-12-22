export default function ProfileInfo({ userProfile }) {
  return (
    <section>
      <div>
        <h1>Your profile info</h1>
        <p>{userProfile.name}</p>
        <p>{userProfile.surname}</p>
        <p>{userProfile.instrument}</p>
        <p>{userProfile.email}</p>
      </div>
    </section>
  );
}
