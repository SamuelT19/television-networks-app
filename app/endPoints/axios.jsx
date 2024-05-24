import axios from "axios";

const axiosBase = axios.create({
  baseURL: "https://tv-networks-server.onrender.com/",
});
export default axiosBase;
