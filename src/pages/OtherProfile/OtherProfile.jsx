import React, { useEffect, useState } from "react";
import { Container, Button, Box } from "@mui/material";
import MClipboard from "../../components/MClipboard";
import { useWeb3React } from "@web3-react/core";
import "./OtherProfile.scss";
import { setItem, deleteItem } from "../../utils/storage";
import { injected } from "../../wallet/connector";
import Tooltip from "@material-ui/core/Tooltip";
import {
  InsertEmoticon,
  MailOutline,
  DownloadForOffline,
  MoreHoriz,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import MBorderButton from "src/components/MButtons/MBorderButton";
import { useDispatch, useSelector } from "react-redux";
import ProfileTab from "./ProfileTab";
import "dotenv/config";
import { getOtherProfile, follow } from "../../store/users/actions";
import { getProfile } from "../../store/profile/actions";

const OtherProfile = (props) => {
  const { active, account, activate } = useWeb3React();
  const [connectBtnTxt, setConnectBtnTxt] = useState("Connect");
  const [value, setValue] = React.useState("1");
  const params = props.match.params;
  const dispatch = useDispatch();
  const profileStatus = useSelector((state) => state.users.status);
  const otherInfo = useSelector((state) => state.users.otherUserInfo);
  const profile = useSelector((state) => state.profile);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const btnTxt = active
      ? `${String(account).substring(0, 6)}...${String(account).substring(38)}`
      : "Connect";
    setConnectBtnTxt(btnTxt);
    dispatch(getOtherProfile(params.customUrl));
  }, [active, false]);

  const connectWallet = async () => {
    try {
      await activate(injected);
      setItem("walletStatus", true);
    } catch (err) {
      console.log(err);
    }
  };

  const onFollow = () => {
    console.log("profile", profile);
    profile
      ? dispatch(follow(otherInfo.email))
      : props.history.push("/sign-in");
  };

  return (
    <Container maxWidth="xl" sx={{ marginTop: "100px" }}>
      {!profileStatus ? (
        <div className="no-profile">No one exists in our marketplace</div>
      ) : (
        <>
          <section className="profile-info-bar">
            <div
              style={{
                width: "100%",
                top: "-75%",
                position: "absolute",
                height: "300px",
                backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}${otherInfo.backgroundImageUrl})`,
                backgroundSize: "cover",
              }}
            ></div>

            <Tooltip title="Edit Profile">
              <Button className="profile-image">
                <img
                  src={
                    process.env.REACT_APP_BACKEND_URL + otherInfo.avatar_url ||
                    "/images/profile-images/profile-empty.png"
                  }
                />
              </Button>
            </Tooltip>
            <div className="wallet-address"></div>
            <div className="bio-text">
              <p>{otherInfo.bio || ""}</p>
            </div>
            <div className="personal">
              <a
                href={`https://${otherInfo.personalSite}`}
                target="_blank"
                style={{ color: "#999" }}
              >
                <b>@{otherInfo.personalSite || ""}</b>
              </a>
            </div>
            <div className="following-bar">
              <label>
                <span className="count">{otherInfo.followers_num}</span>
                <span className="static-string">followers</span>
              </label>
              <label>
                <span className="count">{otherInfo.followings_num}</span>
                <span className="static-string">following</span>
              </label>
            </div>
            <div className="edit-profile">
              <MBorderButton className="edit-btn" onClick={onFollow}>
                <InsertEmoticon sx={{ fontSize: "16px" }} />
                &nbsp;Follow
              </MBorderButton>
              <MBorderButton className="edit-btn" onClick={onFollow}>
                <MailOutline sx={{ fontSize: "16px" }} />
                &nbsp;Send Message
              </MBorderButton>
              <IconButton sx={{ color: "#888", marginLeft: "15px" }}>
                <DownloadForOffline />
              </IconButton>
              <IconButton sx={{ color: "#888" }}>
                <MoreHoriz />
              </IconButton>
            </div>
          </section>
          <section className="tab-bar">
            <ProfileTab />
          </section>
        </>
      )}
    </Container>
  );
};

export default OtherProfile;
