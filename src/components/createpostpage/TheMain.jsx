import PostForm from "./sections/PostForm";

export default function TheMain({ isLoggedIn, setIsLoggedIn }) {
  return (
    <main>
      <PostForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </main>
  );
}
