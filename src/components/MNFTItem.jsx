import React from "react";
import { useHistory } from "react-router-dom";

import { getNetworkName } from "src/utils/config";
import styles from "./MNFTItem.module.scss";
import MColorButton from "./MInput/MColorButton";

const MNFTItem = ({ nft }) => {
  const history = useHistory();

  const handleItemClick = () => {
    history.push(
      `/asset/${nft.Collection?.ChainId}/${nft.Collection?.ContractAddress}/${nft.TokenId}`
    );
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
              <span>VIP ICON Ticket</span>
              <span>Bundle: April 7th</span>
              <span>@7pm</span>
              <span className="creator">{"CreatorName"}</span>
              <span className="name">{nft.Name || "# Unnamed"}</span>
            </div>
            <div className="date-info">
              <label>THURSDAY</label>
              <br></br>
              <label>Apr 7</label>
              <hr className="divider"></hr>
              <label>SECTIION</label>
              <br></br>
              <label>
                VIP
                <br /> MC
              </label>
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
              <label>PRICE</label>
              <br></br>
              <label>$321.10</label>
              <br></br>
              <label>(=0.0957)</label>
            </div>
            <div className="location-info">
              <label>Location</label>
              <br></br>
              <label>MGM Grand</label>
              <br></br>
              <label>Las Vegas, NV</label>
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
