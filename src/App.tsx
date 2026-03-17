import { BrowserRouter, Route, Routes } from "react-router-dom";
import FeedPage from "./pages/FeedPage";
import PostDetails from "./pages/PostDetails";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="post/details/:id" element={<PostDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
