import SignupForm from "./sections/SignupForm";

export default function TheMain({ isLoggedIn }) {
  return (
    <main>
      <SignupForm isLoggedIn={isLoggedIn} />
    </main>
  );
}
