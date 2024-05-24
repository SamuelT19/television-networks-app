import axios from "axios";

const axiosBase = axios.create({
  baseURL: "http://localhost:5000/",
});
export default axiosBase;
