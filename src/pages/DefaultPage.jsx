import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DefaultPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("trello-react-rahul-user"));
    if (user) {
      navigate("/home");
    } else {
      navigate("/logIn");
    }
  }, [navigate]);
  return <></>;
}

export default DefaultPage;
