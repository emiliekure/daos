import EnsambleForm from "./sections/EnsambleForm";

export default function TheMain({ isLoggedIn, setIsLoggedIn }) {
  return (
    <main>
      <EnsambleForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </main>
  );
}
