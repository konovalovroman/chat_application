import React, { useEffect } from "react";
import { useUser } from "../contexts/userContext";

const MainPage: React.FC = () => {

    const { user } = useUser();

    return (
      <>
          <h1>Welcome, {user?.username}</h1>
      </>
    );
};

export default MainPage;
