import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: " http://172.24.174.171:8080/api/",
  headers: {
    "Content-type": "application/json"
  }
});
