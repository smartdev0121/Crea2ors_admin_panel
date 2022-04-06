import React, { useEffect, useState } from "react";
import { EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { apiGetAssets } from "src/utils/api";
import MNFTItem from "src/components/MNFTItem";
import MViewCollection from "../../../components/MViewCollection";
import Box from "@mui/material/Box";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/modules/effect-coverflow/effect-coverflow.scss";
import "swiper/modules/pagination/pagination.scss";
import "./FeaturedArtist.scss";

const TopCollection2 = () => {
  const [smallNFTs, setSmallNFTs] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        console.log("start===================");
        const res = await apiGetAssets();
        console.log("================", res);
        res.splice(5);
        setSmallNFTs(res);
      } catch {
        ((err) => {
          console.log(err);
        })();
      }
    })();
  }, []);
  return (
    <Box className="medium-collection">
      <div className="welcome-image collection-1">
        <div className="top-collection pulse">
          <img src="/images/home/visual.png" alt="Visual" />
          <MViewCollection />
        </div>

        <Swiper
          slidesPerView={4}
          grabCursor={true}
          spaceBetween={30}
          centeredSlides={false}
          pagination={{
            clickable: true,
          }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {smallNFTs.map((item, index) => {
            return (
              <SwiperSlide>
                <MNFTItem key={`nft_${index}`} nft={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </Box>
  );
};

export default TopCollection2;
