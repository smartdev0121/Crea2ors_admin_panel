import React from "react";
import { useSelector } from "react-redux";
import HeaderLogin from "./HeaderLogin";
import HeaderLogout from "./HeaderLogout";

import MSpin from "src/components/MSpin";
import Footer from "./Footer";
import styled from "styled-components";

const MainLayout = ({ children }) => {
  const user = useSelector((state) => state.profile);
  return (
    <>
      {user ? <HeaderLogin /> : <HeaderLogout />}
      <MBody>{children}</MBody>
      <Footer />
    </>
  );
};

export default MainLayout;

const MBody = styled.div`
  min-height: 50vh;
`;
