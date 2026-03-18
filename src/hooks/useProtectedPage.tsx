import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function useProtectedPage() {
  const navigate = useNavigate();
  const { userLogged } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token || !userLogged.token) {
      navigate("/auth");
    }
  }, []);
}

export default useProtectedPage;
