import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MConnectButton from "src/components/MConnectButton";
import MViewCollection from "../../../components/MViewCollection";

const WelcomeSection = () => {
  return (
    <Box className="section-welcome container">
      {/* <div className="welcome-content">
          <div className="btn-group">
            <Button className="btn btn-secondary">Discover</Button>
            <MConnectButton />
          </div>
        </div> */}
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
