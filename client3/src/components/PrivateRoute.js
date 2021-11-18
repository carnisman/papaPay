import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";
import { config } from "../utils/config";

const PrivateRoute = ({component, ...props}) => {
  const [user, setUser] = useState(localStorage.getItem("user"));

  const getUser = async () => {
    // Si auth esta en false nos da los permisos y usuario mock
    if (!user) {
      try {
        const { data } = await axios.post(config.BASE_URL + "/login");
        localStorage.setItem("user", data.user);
        localStorage.setItem("permisos", data.permisos);
        setUser(localStorage.getItem("user"));
      } catch (e) {
        window.top.location = config.BASE_URL + "/login";
      }
    }
  }

  useEffect(getUser, []);

  return user
    ? <Route {...props} component={component} />
    : <Route {...props} component={Loading} />;
};

export default PrivateRoute;
