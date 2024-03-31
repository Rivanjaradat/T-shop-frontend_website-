
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
