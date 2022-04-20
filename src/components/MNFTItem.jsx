import React from "react";
import { useHistory } from "react-router-dom";

import { getNetworkName } from "src/utils/config";
import styles from "./MNFTItem.module.scss";
import MColorButton from "./MInput/MColorButton";
import Avatar from "@mui/material/Avatar";

const MNFTItem = ({ nft }) => {
  const handleItemClick = () => {
    // history.push(
    //   `/asset/${nft.Collection?.ChainId}/${nft.Collection?.ContractAddress}/${nft.TokenId}`
    // );
  };

  return (
    <div className={styles.nftItem} onClick={handleItemClick}>
      <div className="nft-item-wrapper">
        <div className="nft-item-image">
          <img src={nft.ImageUrl || "/images/img_error.png"} alt="nft-item" />
        </div>
        <div className="nft-item-content">
          <div className="launch-info">
            <div className="detailed-info">
              <span className="limit">LIMITED EDITION</span>
              <span className="name">{nft.Name || "# Unnamed"}</span>
              <div className="creator">
                <Avatar alt="Remy Sharp" src="/images/avatar.png" />
                {"@RommeroBritoxDJWhiteShadow"}
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="nft-item-extra-info">
            {nft.Orders && nft.Orders.length > 0 && (
              <span className="order-info">
                <img src="/images/crypto-icons/eth.png" alt="crypto" />
                {nft.Orders[0].BuyerPrice}
              </span>
            )}
            <div className="price-info">
              <label className="price-label">PRICE</label>
              <label className="price">$321.10</label>
              <label className="eth-price">(=0.0957)</label>
            </div>
            <div className="location-info">
              <label className="edition">EDITION</label>
              <label className="counter">1 of 1</label>
            </div>
          </div>
          <div className="buy-button-part">
            <img src="/images/home/button-pin.svg" />
            <MColorButton variant="outlined">BUY NOW</MColorButton>
          </div>
        </div>
      </div>
      <span className="nft-network">
        {getNetworkName(nft.Collection?.ChainId)}
      </span>
    </div>
  );
};

export default MNFTItem;
