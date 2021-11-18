import axios from "axios";
import jwt from "jsonwebtoken";
import { config } from "./config";

export const environmentCall = async () => {
  try {
    const res = await axios.get(config.BASE_URL + "/get_enviroment")
    return res.data
  } catch (e) {
    return "development"
  }
};
