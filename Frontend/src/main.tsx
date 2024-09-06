import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/Store.tsx";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "@mui/material";
import { SocketProvider } from "./Context/SocketContext.tsx";
import IncomingCallModal from "./Components/Layout/IncommingCallModal.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Container style={{ maxWidth: "1500px", padding: "0" }}>
            <SocketProvider>
              <IncomingCallModal/>
              <App />
            </SocketProvider>
          </Container>
          <ToastContainer />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
