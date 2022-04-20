import React from "react";
import ScrollToHide from "./ScrollToHide";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import HeaderContent from "./HeaderContent";

const HeaderBarScrollToHide = () => {
  return (
    <ScrollToHide thresold={0}>
      <AppBar position="fixed">
        <Toolbar>
          <HeaderContent />
        </Toolbar>
      </AppBar>
    </ScrollToHide>
  );
};

export default HeaderBarScrollToHide;
