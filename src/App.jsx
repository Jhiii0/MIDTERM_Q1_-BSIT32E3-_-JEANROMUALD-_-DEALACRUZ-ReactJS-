import { useState } from "react";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { login as apiLogin, fetchRecipes, logout } from "./apiClient.js";

export default function App() {
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem("jwt_auth");
    return saved ? JSON.parse(saved) : null;
  });

  const handleLoggedIn = async ({ userName, password }) => {
    const session = await apiLogin({ userName, password });
    setAuth(session);
    localStorage.setItem("jwt_auth", JSON.stringify(session));
    return session;
  };

  const handleLogout = async (currentAuth) => {
    await logout(currentAuth);
    setAuth(null);
    localStorage.removeItem("jwt_auth");
  };

  const handleFetchRecipes = async (currentAuth) => {
    return fetchRecipes(currentAuth);
  };

  return (
    <div className="panel">
      {!auth ? (
        <Login onLoggedIn={handleLoggedIn} />
      ) : (
        <Dashboard
          auth={auth}
          onLogout={handleLogout}
          onFetchRecipes={handleFetchRecipes}
        />
      )}
    </div>
  );
}