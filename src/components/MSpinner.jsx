import React from "react";
import { ClipLoader, MoonLoader } from "react-spinners";

const MSpinner = () => {
  return (
    <div className="spinner-container">
      <MoonLoader size={150} />
    </div>
  );
};

export default MSpinner;
