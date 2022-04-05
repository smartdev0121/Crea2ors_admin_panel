import React, { useEffect, useState } from "react";
import { EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { apiGetAssets } from "src/utils/api";
import MNFTItem from "src/components/MNFTItem";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/modules/effect-coverflow/effect-coverflow.scss";
import "swiper/modules/pagination/pagination.scss";
import "./FeaturedArtist.scss";
import "./WelcomeSection.scss";

const TopCollection1 = () => {
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
    <div className="welcome-image collection-1">
      <div className="top-collection">
        <img src="/images/home/visual.png" alt="Visual" />
      </div>
      <Swiper
        slidesPerView={2}
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
  );
};

export default TopCollection1;
