import Tooltip, { TooltipProps } from "@material-ui/core/Tooltip";
import copy from "copy-to-clipboard";
import React, { useState } from "react";

/**
 * Render prop component that wraps element in a Tooltip that shows "Copied to clipboard!" when the
 * copy function is invoked
 */
const MClipboard = (props) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const onCopy = (content) => {
    copy(content);
    setShowTooltip(true);
  };

  const handleOnTooltipClose = () => {
    setShowTooltip(false);
  };
  return (
    <Tooltip
      open={showTooltip}
      title={"Copied to clipboard!"}
      leaveDelay={1500}
      onClose={handleOnTooltipClose}
    >
      {props.children({ copy: onCopy })}
    </Tooltip>
  );
};

export default MClipboard;
