import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MConnectButton from "src/components/MConnectButton";
import styles from "./WelcomeSection.scss";
import MColorButtonView from "../../../components/MInput/MColorButtonView";

const WelcomeSection = () => {
  return (
    <div className="home-banner">
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
            <MColorButtonView className="view-collection-btn">
              View Collection
            </MColorButtonView>
          </div>

          <div className="small-banner-collection">
            <img src="/images/home/small1.png" />
            <img src="/images/home/small2.png" />
          </div>
        </div>
      </Box>
    </div>
  );
};

export default WelcomeSection;
