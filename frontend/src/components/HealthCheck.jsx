import { useEffect } from "react";
import api from "../services/api";

const HealthCheck = () => {
  useEffect(() => {
    api.get("/health")
      .then(res => console.log("Health:", res.data))
      .catch(err => console.error(err));
  }, []);

  return null;
};

export default HealthCheck;
