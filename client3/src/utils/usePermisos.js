import { useEffect, useState } from "react";
import { config } from "../utils/config";
import jwt from "jsonwebtoken";

export const usePermisos = ({ group, permiso, redirect = true }) => {
  const [isAllowed, setIsAllowed] = useState(false);

  const checkPermisos = async () => {
    const permisos = jwt.decode(localStorage.getItem("permisos"))?.permisos;
    const permisosGroups = permisos.map((el) => el.split("-")[0]);
    if (permisos) {
      if (group) {
        if (!permisosGroups.includes(group)) {
          setIsAllowed(false);
          if (redirect) window.top.location = config.BASE_URL + "/404";
        } else setIsAllowed(true);
      } else if (!permisos.includes(permiso)) {
        setIsAllowed(false);
        if (redirect) window.top.location = config.BASE_URL + "/404";
      } else setIsAllowed(true);
    } else {
      setIsAllowed(false);
      if (redirect) window.top.location = config.BASE_URL + "/";
    }
  }

  useEffect(checkPermisos, [group, permiso]);

  return { isAllowed };
}

export default usePermisos;