import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "src/slices/loadingSlice";

import { apiGetAssets, apiGetCollectionInfo } from "src/utils/api";
import { getCurrentWalletAddress } from "src/utils/wallet";

import MNFTItem from "src/components/MNFTItem";

const CollectionAssetsPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [collection, setCollection] = useState({});
  const [nfts, setNfts] = useState([]);
  const [owner, setOwner] = useState(false);

  const { chainId, address } = useParams();

  const handleEditCollection = () => {
    history.push(`/collection/${chainId}/${address}/edit`);
  };

  useEffect(() => {
    (async () => {
      dispatch(setLoading(true));
      try {
        const res = await apiGetAssets(address, chainId);
        const col_response = await apiGetCollectionInfo(address, chainId);
        const wallet_address = await getCurrentWalletAddress();

        setNfts(res);
        setCollection(col_response);
        setOwner(
          wallet_address.toUpperCase() === col_response.Wallet.toUpperCase()
        );

        dispatch(setLoading(false));
      } catch {
        dispatch(setLoading(false));
      }
    })();
  }, [chainId, address]); //eslint-disable-line

  return (
    <div className="collection-assets-page">
      <section className="collection-info">
        <div className="collection-image">
          <img
            src={collection.ImageUrl || "/images/img_error.png"}
            alt="collection"
          />
        </div>

        <h2>{collection.CollectionName}</h2>

        <span>
          Created by &nbsp;
          <Link to={`/assets/${collection.Wallet}`}>{collection.Wallet}</Link>
        </span>

        <div className="collection-details">
          <span>{nfts.length} Items</span>
        </div>

        <span>{collection.Description}</span>

        {owner && (
          <button onClick={handleEditCollection}>Edit Collection</button>
        )}
      </section>

      <section className="asset-list">
        {nfts.map((item, key) => {
          return <MNFTItem key={`nft${key}`} nft={item} />;
        })}
      </section>
    </div>
  );
};

export default CollectionAssetsPage;
