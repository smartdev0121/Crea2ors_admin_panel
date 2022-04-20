import React from "react";
import { HashLoader } from "react-spinners";
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
      <HashLoader size={100} color="#F10EA5" css={override} />
    </div>
  );
};

export default MSpinner;
