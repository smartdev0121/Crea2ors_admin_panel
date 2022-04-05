import React from "react";

import HelpSection from "./Sections/HelpSection";
import LiveAuctionSection from "./Sections/LiveAuctionSection";
import MarketplaceStatusSection from "./Sections/MarketplaceStatusSection";
import NotableDropSection from "./Sections/NotableDropSection";
import TrendingCollectionSection from "./Sections/TrendingCollectionSection";
import WelcomeSection from "./Sections/WelcomeSection";
import ButtonBar from "./Sections/ButtonBar";
import styles from "./Home.module.scss";
import FeaturedArtist from "./Sections/FeaturedArtist";
import TopCollection1 from "./Sections/TopCollection1";
import TopCollection2 from "./Sections/TopCollection2";

const HomePage = () => {
  return (
    <main className={styles.homepage}>
      <WelcomeSection />
      <ButtonBar />

      <FeaturedArtist />
      {/* <MarketplaceStatusSection /> */}
      <TopCollection1 />
      <TopCollection2 />
      {/* <NotableDropSection /> */}
      {/* <LiveAuctionSection /> */}
      {/* <TrendingCollectionSection /> */}
      {/* <HelpSection /> */}
    </main>
  );
};

export default HomePage;
