import { Container, Box } from "@mui/material";
import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import MColorButtonView from "../../components/MInput/MColorButtonView";
import {fetchMetaData} from "src/utils/pinata";
import CollectionInfoTab from "./CollectionInfoTab1";
import "./CollectionView.scss";

const CollectionView = () => {
  const newCollectionInfo = useSelector((state) => state.contract);
  const dispatch = useDispatch();
  const [metaData, setMetaData] = useState(undefined);

  useEffect(async () => {
    let contractMetaData = null;
    if (newCollectionInfo.contractUri) {
      contractMetaData = await fetchMetaData(newCollectionInfo.contractUri);
      console.log(
        "metadata", contractMetaData
      )
      setMetaData(contractMetaData)
    }
  }, [newCollectionInfo])
  return (
    <Container maxWidth="lg" sx={{ marginTop: "100px" }}>
      <Box
        sx={{
          p: 2,
          backgroundColor: "#36363666",
        }}
      >
        <section className="image-section">
          <div className="shadow"></div>
          <img src="/images/home/visual.png" />
          <div className="image-info-part">
            <h2>{metaData?.collectionName}</h2>
          </div>
        </section>
        <section className="info-section">
          <div className="description">
            {metaData?.highLight}
          </div>
          <div className="info-tab">
            <CollectionInfoTab metaData={metaData} />
          </div>
        </section>
      </Box>
      <section className="create-button-part">
        <MColorButtonView>Create your NFTs</MColorButtonView>
      </section>
    </Container>
  );
};
export default CollectionView;
