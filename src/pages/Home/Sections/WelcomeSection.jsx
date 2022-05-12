import { Box, Skeleton } from "@mui/material";
import MViewCollection from "../../../components/MViewCollection";

const WelcomeSection = () => {
  return (
    <Box className="section-welcome container">
      <div className="welcome-image">
        <div className="top-collection pulse">
          <img src="/images/home/visual.png" alt="Visual" />
          <MViewCollection />
        </div>

        <div className="small-banner-collection">
          <div className="top-collection">
            <img src="/images/home/visual.png" alt="Visual" />
            <MViewCollection />
          </div>
          <div className="top-collection">
            <img src="/images/home/visual.png" alt="Visual" />
            <MViewCollection />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default WelcomeSection;
