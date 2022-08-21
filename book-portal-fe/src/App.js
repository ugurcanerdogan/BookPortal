import React from "react";
import "./App.css";
import { Container } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import Dashboard from "./layouts/Dashboard";
import Navi from "./layouts/Navi";

function App() {

  return (
    <div className="App">
      <ToastContainer theme="colored" position="bottom-right" />
      <Navi />
      <Container className="main">
        <Dashboard />
      </Container>
    </div>
  );
}

export default App;
