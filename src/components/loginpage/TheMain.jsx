import LoginForm from "./sections/LoginForm";

export default function TheMain({ isLoggedIn, setIsLoggedIn }) {
  return (
    <main>
      <LoginForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </main>
  );
}
