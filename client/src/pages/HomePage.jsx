import React from "react";
import { useAuthStore } from "../store/useAuthStore";

const HomePage = () => {
  const  { logout} = useAuthStore()
  return <div>
    <h1>Welcome to the home page</h1>
    <button onClick={logout}>logout</button>
  </div>;
};

export default HomePage;
