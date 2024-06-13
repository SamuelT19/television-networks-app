import axios from "axios";

const axiosBase = axios.create({
  baseURL: "http://localhost:5000/" || "https://tv-networks-server.onrender.com/",
});
export default axiosBase;
