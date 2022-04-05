import React from "react";
import MColorButtonView from "./MInput/MColorButtonView";

const MViewCollection = () => {
  return (
    <div className="view-collection">
      <h4 className="category-name">Category1</h4>
      <h3 classname="collection-name">CollectionName</h3>
      <MColorButtonView className="view-collection-btn">
        View Collection
      </MColorButtonView>
    </div>
  );
};

export default MViewCollection;
