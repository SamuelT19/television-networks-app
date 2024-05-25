import axios from "axios";

const axiosBase = axios.create({
  baseURL: "https://tv-networks-server.onrender.com/",
  // baseURL: "http://localhost:5000/",
});
export default axiosBase;
