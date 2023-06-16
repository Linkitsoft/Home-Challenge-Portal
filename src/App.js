import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/app.scss";
import "react-toastify/dist/ReactToastify.css";
import "./assets/fontawesome/css/all.css";
import { ToastContainer } from "react-toastify";

import MyRoutes from "./routes";

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <MyRoutes />
    </>
  );
}

export default App;

