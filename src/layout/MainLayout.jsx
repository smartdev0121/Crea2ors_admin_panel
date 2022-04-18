import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import MSpin from "src/components/MSpin";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
