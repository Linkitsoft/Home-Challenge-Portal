import axios from "axios";

const token = localStorage?.getItem("token");

const instance = axios.create({
  baseURL : "http://localhost:8000/api/user/",
  headers: {
    "Content-Type": "application/json",
    // "access-control-allow-origin": "*",
    Authorization: `Bearer ${token}`,
  },
});

export default instance;
