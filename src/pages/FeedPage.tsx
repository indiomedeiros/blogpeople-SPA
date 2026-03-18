import useProtectedPage from "../hooks/useProtectedPage";

function FeedPage() {
  useProtectedPage();
  return <>FeedPage</>;
}

export default FeedPage;
