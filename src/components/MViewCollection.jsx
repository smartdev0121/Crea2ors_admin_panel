import React from "react";
import MColorButtonView from "./MInput/MColorButtonView";

const MViewCollection = () => {
  return (
    <>
      <div className="view-collection-back"></div>
      <div className="view-collection">
        <h4 className="category-name">ARCHITECTURE</h4>
        <h4 className="collection-name">Landscapes on Canada Mountains</h4>
        <MColorButtonView className="view-collection-btn">
          View Collection
        </MColorButtonView>
      </div>
    </>
  );
};

export default MViewCollection;
