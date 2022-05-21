import React from "react";
import { useSelector } from "react-redux";
import HeaderLogin from "./HeaderLogin";
import styled from "styled-components";
import Dashboard from "./dashboard";

const MainLayout = ({ children }) => {
  const user = useSelector((state) => state.profile);
  return (
    <>{user ? <Dashboard>{children}</Dashboard> : <MBody>{children}</MBody>}</>
  );
};

export default MainLayout;

const MBody = styled.div`
  min-height: 100vh;
`;
