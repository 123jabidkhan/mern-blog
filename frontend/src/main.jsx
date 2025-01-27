import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvider from './components/themeProvider.jsx'
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <BrowserRouter>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
      </Provider>
    </PersistGate>
    </BrowserRouter>

  </React.StrictMode>

);
