import axios from "axios";

const token = localStorage?.getItem("token");

const instance = axios.create({
  baseURL: "http://192.168.0.127/api/user/",
  // baseURL : "http://localhost:8000/api/user/",
  headers: {
    "Content-Type": "application/json",
    // "access-control-allow-origin": "*",
    Authorization: `Bearer ${token}`,
  },
});

export default instance;
