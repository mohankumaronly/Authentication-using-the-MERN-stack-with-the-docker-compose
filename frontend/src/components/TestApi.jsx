import { useEffect, useState } from "react";
import api from "../services/api";

const TestApi = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/test")
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.error(err);
        setMessage("Failed to fetch data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return <p>{message}</p>;
};

export default TestApi;
