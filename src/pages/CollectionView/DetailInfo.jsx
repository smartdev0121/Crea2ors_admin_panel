import React from "react";
import { Box, Avatar, IconButton } from "@mui/material";
import MColorButton from "../../components/MInput/MColorButton";
import { ContentCopy, PlayArrow } from "@mui/icons-material";
const DetailInfo = (props) => {
  return (
    <Box>
      <div className="image-part">
        {props.url && (<><video width="100%" height="300px"><source src={props.url}></source></video> 
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
        </div></>)
        }
      </div>
      <p>
        {props?.desc}
      </p>
      <MColorButton>READ LESS</MColorButton>
    </Box>
  );
};

export default DetailInfo;
