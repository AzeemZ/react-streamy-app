import axios from "axios";

export default axios.create({
  baseURL: "https://node-json-server.herokuapp.com"
});
