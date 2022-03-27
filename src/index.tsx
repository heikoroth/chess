import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="chess-game.eu.auth0.com"
        clientId="T3hIqwKbQqtTxqUJUcqJILVJ5fTEOAJK"
        redirectUri={window.location.origin}
        audience="chess-game API"
        scope="openid profile email"
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
