import { Container, Box } from "@mui/material";
import React from "react";
import MColorButtonView from "../../components/MInput/MColorButtonView";
import "./CollectionView.scss";
import CollectionInfoTab from "./CollectionInfoTab1";

const CollectionView = () => {
  return (
    <Container class="view-container" maxWidth="lg" sx={{ marginTop: "100px" }}>
      <Box
        sx={{
          p: 2,
          backgroundColor: "#36363666",
        }}
      >
        <section className="image-section">
          <img src="/images/home/visual.png" />
          <div className="image-info-part">
            <h2>Romero Britto X DJ White Shadow</h2>
            <label>COLLECTION OPENS</label>
            <label>Thursday, Oct 28 06:00 PM</label>
          </div>
        </section>
        <section className="info-section">
          <div className="description">
            The "Romero Britto" NFT visual album collection, available
            exclusively on Yellowheart, includes ten digital music masterpieces
            produced by the famous DJ White system.
          </div>
          <div className="info-tab">
            <CollectionInfoTab />
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
