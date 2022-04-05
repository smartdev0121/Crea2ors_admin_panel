import React, { useEffect, useState } from "react";

import { apiGetAssets } from "src/utils/api";

import MNFTItem from "src/components/MNFTItem";

const LiveAuctionSection = () => {
  const [auctionAssets, setAuctionAssets] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGetAssets();
        res.splice(5);
        setAuctionAssets(res);
      } catch {}
    })();
  }, []);

  return (
    <section className="section-live-auction">
      <div className="container">
        <h3>Live auctions</h3>
        <div className="auction-list">
          {auctionAssets.map((auctionAsset, index) => (
            <MNFTItem key={`auction_${index}`} nft={auctionAsset} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveAuctionSection;
