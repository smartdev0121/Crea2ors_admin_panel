import React from "react";
import { useSelector } from "react-redux";
import HeaderLogin from "./HeaderLogin";
import HeaderLogout from "./HeaderLogout";

import MSpin from "src/components/MSpin";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  const user = useSelector((state) => state.profile);
  return (
    <>
      {user ? <HeaderLogin /> : <HeaderLogout />}
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
