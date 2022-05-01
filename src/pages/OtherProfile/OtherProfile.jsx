import React, { useEffect, useState } from "react";
import { Container, Button, Box } from "@mui/material";
import MClipboard from "../../components/MClipboard";
import { useWeb3React } from "@web3-react/core";
import "./OtherProfile.scss";
import { setItem, deleteItem } from "../../utils/storage";
import { injected } from "../../wallet/connector";
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
import { getOtherProfile } from "../../store/users/actions";

const OtherProfile = (props) => {
  const { active, account, activate } = useWeb3React();
  const [connectBtnTxt, setConnectBtnTxt] = useState("Connect");
  const [value, setValue] = React.useState("1");
  const params = props.match.params;
  const dispatch = useDispatch();
  const profileStatus = useSelector((state) => state.users.status);
  const otherInfo = useSelector((state) => state.users.otherUserInfo);
  console.log(profileStatus);
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

  const onEditProfile = () => {
    props.history.push("/edit-profile");
  };

  return (
    <Container maxWidth="xl" sx={{ marginTop: "100px" }}>
      {!profileStatus ? (
        <div className="no-profile">No one exists in our marketplace</div>
      ) : (
        <>
          <section className="profile-info-bar">
            <div className="profile-image">
              <img
                src={
                  process.env.REACT_APP_BACKEND_URL + otherInfo.avatar_url ||
                  "/images/profile-images/profile-empty.png"
                }
              />
            </div>
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
                <span className="count">0</span>
                <span className="static-string">followers</span>
              </label>
              <label>
                <span className="count">0</span>
                <span className="static-string">following</span>
              </label>
            </div>
            <div className="edit-profile">
              <MBorderButton className="edit-btn" onClick={onEditProfile}>
                <InsertEmoticon sx={{fontSize: "16px"}}/>
                &nbsp;Follow
              </MBorderButton>
              <MBorderButton className="edit-btn" onClick={onEditProfile}>
                <MailOutline sx={{fontSize: "16px"}}/>
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
