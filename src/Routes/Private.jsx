import { useState, useEffect } from "react";
import { useAuth } from "../Context/auth.jsx";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../assets/Spinner.jsx";
import { API_URL } from "../api.js";

export default function Private() {
  const { auth } = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      const user = await axios.get(`${API_URL}/api/auth/user-auth`);
      if (user.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
}
