import React from "react";
import { IconButton, Container, Stack, Avatar, Button } from "@mui/material";
import {
  Pause,
  Contrast,
  VolumeOff,
  Fullscreen,
  Diamond,
  AudioFile,
  LockOpen,
  DensityMedium,
} from "@mui/icons-material";
import "./NFTView.scss";
import { styled } from "@mui/material/styles";
import { Logout } from "@mui/icons-material";
import MColorButtonView from "../../components/MInput/MColorButtonView";
import MSelectBox from "../../components/MInput/MSelectBox";
const qty = [1, 2, 3, 4, 5];

const ViewButton = styled(Button)((theme) => ({
  color: "yellow",
  fontSize: "15px",
  fontWeight: "600",
}));

const AssetButton = styled(Button)((theme) => ({
  border: "1px solid #777",
  color: "#777",
  "&hover": {
    color: "#279f00",
    borderColor: "#279f00",
  },
}));

const NFTView = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: "100px" }}>
      <Stack direction="row">
        <div>
          <div className="asset-view">
            <img src="/images/home/visual.png" />
            <div className="control-part">
              <IconButton sx={{ color: "yellow" }}>
                <Pause />
              </IconButton>
              <IconButton sx={{ color: "yellow" }}>
                <Contrast />
              </IconButton>
              <IconButton sx={{ color: "yellow" }}>
                <VolumeOff />
              </IconButton>
              <IconButton sx={{ color: "yellow" }}>
                <Fullscreen />
              </IconButton>
            </div>
          </div>
          <div className="detail-info">
            <div className="minted">
              <span>MINTED</span>
              <div className="diamond">
                <Diamond />
                60
              </div>
            </div>
            <div>
              <span>CREATED BY</span>
              <div className="created">
                <Avatar src="/images/avatar.png" className="avatar" />
                <label>@LesClayPool</label>
              </div>
            </div>
            <div>
              <span>OWNED BY</span>
              <div className="owned">
                <Avatar src="/images/avatar.png" className="avatar" />
                <div>
                  <h4>@Attractive-Magenta-Night</h4>
                  <h4>+52 others</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="desc-part">
            <h3>Description -</h3>
            <p>
              We're working on launching the first version (MVP) of a new
              concept app to test the market with. We've designed a prototype
              using Figma and Ant Design and are looking for a senior full-stack
              developer to take us to release and market. You'll work directly
              with the Founder of the company and the head of product. You'll
              own the entire feasibility discussion and timeline.{" "}
            </p>
            <ViewButton>
              VIEW ON OPENSEA
              <Logout />
            </ViewButton>
          </div>
        </div>
        <div className="side-part">
          <h2>Self Within His Self</h2>
          <Stack direction="row">
            <AssetButton className="asset-btn">
              <AudioFile />
              Music
            </AssetButton>
            <AssetButton className="asset-btn">
              <LockOpen />
              Reedeemable
            </AssetButton>
          </Stack>
          <div className="price-count">
            <div>
              <h4>PRICE</h4>
              <h2>
                $250
                <DensityMedium fontSize="small" />
                <span className="grey-txt">0.06607</span>
              </h2>
            </div>
            <div>
              <h4>EDITION</h4>
              <h3>61/100</h3>
            </div>
          </div>
          <div className="button-part">
            <MSelectBox values={qty} className="select-box"></MSelectBox>
            <MColorButtonView sx={{ height: "40px" }}>BUY NOW</MColorButtonView>
          </div>
        </div>
      </Stack>
    </Container>
  );
};

export default NFTView;
