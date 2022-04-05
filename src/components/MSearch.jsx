import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import { apiGetSearchResult } from "src/utils/api";

import styles from "./MSearch.module.scss";

const CollectionSearchResults = (props) => {
  const { Collections } = props;

  return (
    <section className="collection-result">
      <span className="section-name">Collection</span>
      {Collections?.length > 0 &&
        Collections?.map((collection, index) => {
          return (
            <Link
              key={`search-collection-${index}`}
              className="search-result"
              id="search-result"
              to={`/collection/${collection.ChainId}/${collection.ContractAddress}`}
            >
              <span>
                <img src={collection.ImageUrl} alt="collection-img" />
              </span>
              <span>{collection.CollectionName}</span>
            </Link>
          );
        })}
    </section>
  );
};

const AssetSearchResults = (props) => {
  const { Assets } = props;

  return (
    <section className="asset-result">
      <span className="section-name">Assets</span>
      {Assets?.length > 0 &&
        Assets?.map((asset, index) => {
          return (
            <Link
              key={`search-asset-${index}`}
              className="search-result"
              id="search-result"
              to={`/asset/${asset.Collection?.ChainId}/${asset.Collection?.ContractAddress}/${asset.TokenId}`}
            >
              <span>
                <img src={asset.ImageUrl} alt="collection-img" />
              </span>
              <span>{asset.Name}</span>
            </Link>
          );
        })}
    </section>
  );
};

const MSearch = () => {
  const [res, setRes] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSearch = async (term) => {
    const result = await apiGetSearchResult(term);
    setSearchTerm(term);
    setRes(result || {});
  };

  useEffect(() => {
    const documentClicked = (e) => {
      const index = e.path.findIndex(
        (t) => t === document.getElementById("m-search")
      );

      if (index !== -1) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    document.addEventListener("click", documentClicked);

    return () => {
      document.removeEventListener("click", documentClicked);
    };
  });

  return (
    <div className={styles.searchInput}>
      <input
        className="search"
        id="m-search"
        placeholder="Search by artist, collectable, or collection"
        autoComplete="off"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <span className="search-icon">
        <FaSearch />
      </span>

      {visible === true && searchTerm.length > 0 && (
        <div className="search-result-wrapper">
          <CollectionSearchResults Collections={res.Collections} />
          <AssetSearchResults Assets={res.Assets} />
        </div>
      )}
    </div>
  );
};

export default MSearch;
