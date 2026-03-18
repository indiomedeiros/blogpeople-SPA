import { BrowserRouter, Route, Routes } from "react-router-dom";
import FeedPage from "./pages/FeedPage";
import PostDetails from "./pages/PostDetails";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import AuthProvider from "./contexts/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className=" flex flex-col max-w mx-auto min-h-screen">
          <Header />
          <div className="flex-1 bg-gray-50">
            <Routes>
              <Route path="/" element={<FeedPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="post/details/:id" element={<PostDetails />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
