import React from "react";
import { HashLoader } from "react-spinners";
import ReactLoading from "react-loading";

import { css } from "@emotion/react";
import "./MSpinner.scss";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const MSpinner = () => {
  return (
    <div className="spinner-container">
      <ReactLoading type="spin" color="#F10EA5" height={30} width={30} />
    </div>
  );
};

export default MSpinner;
