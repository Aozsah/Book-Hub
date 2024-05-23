import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function UserLogout() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    auth.setIsLoggedIn(false);
    navigate("/");
  };

  return <button onClick={handleLogout}>Çıkış Yap</button>;
}
