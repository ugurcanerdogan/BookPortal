import React from "react";
import UserSignupPage from "../pages/UserSignupPage";
import LanguageSelector from "../components/LanguageSelector";
import LoginPage from "../pages/LoginPage";

function App() {
  return (
    <div>
      <LoginPage />
      <LanguageSelector />
    </div>
  );
}

export default App;