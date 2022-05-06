import { Container, Box, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MColorButtonView from "../../components/MInput/MColorButtonView";
import { fetchMetaData } from "src/utils/pinata";
import CollectionInfoTab from "./CollectionInfoTab1";
import { getContractUri } from "src/store/contract/actions";
import "./CollectionView.scss";

const CollectionView = (props) => {
  const newCollectionInfo = useSelector((state) => state.contract);
  const { contractAddress } = props.match.params;
  const dispatch = useDispatch();
  const [metaData, setMetaData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    dispatch(getContractUri(contractAddress));
    let contractMetaData = null;
    if (newCollectionInfo.contractUri) {
      setIsLoading(true);
      contractMetaData = await fetchMetaData(newCollectionInfo.contractUri);
      setIsLoading(false);
      setMetaData({ ...metaData, ...contractMetaData });
    }
  }, [newCollectionInfo]);
  return (
    <Container maxWidth="lg" sx={{ marginTop: "100px" }}>
      <Box
        sx={{
          p: 2,
          backgroundColor: "#36363666",
        }}
      >
        {isLoading ? (
          <Skeleton animation="wave" width="100%" height="300px" />
        ) : (
          <section className="image-section">
            <div className="shadow"></div>
            <img src={metaData?.image_url || "/images/home/visual.png"} />
            <div className="image-info-part">
              <h2>{metaData?.collectionName}</h2>
              <p>{metaData?.category + "/" + metaData?.subCategory}</p>
              <p>Colleciton Token Limit: {metaData?.tokenLimit}</p>
            </div>
          </section>
        )}

        <section className="info-section">
          {isLoading ? (
            <Skeleton animation="wave" width="100%" height="200px" />
          ) : (
            <div className="description">{metaData?.highLight}</div>
          )}
          {isLoading ? (
            <Skeleton animation="wave" width="100%" height="200px" />
          ) : (
            <div className="info-tab">
              <CollectionInfoTab metaData={metaData} />
            </div>
          )}
        </section>
      </Box>
      <section className="create-button-part">
        <MColorButtonView>Create your NFTs</MColorButtonView>
      </section>
    </Container>
  );
};
export default CollectionView;
