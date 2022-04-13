import React from "react";
import { Box, Avatar, IconButton } from "@mui/material";
import MColorButton from "../../components/MInput/MColorButton";
import { ContentCopy, PlayArrow } from "@mui/icons-material";
const DetailInfo = () => {
  return (
    <Box>
      <div class="image-part">
        <img src="/images/home/visual.png"></img>
        <div className="creator-detail">
          <Avatar alt="Remy Sharp" src="/images/avatar.png" />
          ROMMERO_BRITOX_DJ_WHITE_SHADOW NET COLLECTION
        </div>
        <div className="content-copy">
          <IconButton>
            <ContentCopy sx={{ color: "white" }} />
          </IconButton>
          <label>Copy link</label>
        </div>
        <div className="watch-video">
          Watch on{" "}
          <IconButton type="button">
            <PlayArrow />
            Youtubu
          </IconButton>
        </div>
      </div>
      <p>
        The "Romero Britto" NFT visual album collection, available exclusively
        on Yellowheart, includes ten digital music masterpieces produced by the
        famous DJ White system.
      </p>
      <MColorButton>READ LESS</MColorButton>
    </Box>
  );
};

export default DetailInfo;
