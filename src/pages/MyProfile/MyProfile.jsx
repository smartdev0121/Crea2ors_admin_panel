import React, { useEffect, useState } from "react";
import { Container, Button, Box } from "@mui/material";
import MClipboard from "../../components/MClipboard";
import { useWeb3React } from "@web3-react/core";
import { setItem, deleteItem } from "../../utils/storage";
import { injected } from "../../wallet/connector";
import {
  Settings,
  DownloadForOffline,
  MoreHoriz,
  Edit,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ProfileTab from "./ProfileTab";
import MBorderButton from "src/components/MButtons/MBorderButton";
import Tooltip from "@material-ui/core/Tooltip";
import MImageCropper from "src/components/MImageCropper";
import { profileBackgroundUpdate } from "src/store/users/actions";
import "./MyProfile.scss";
import "dotenv/config";

const MyProfile = (props) => {
  const { active, account, activate } = useWeb3React();
  const [connectBtnTxt, setConnectBtnTxt] = useState("Connect");
  const [value, setValue] = React.useState("1");
  const userInfo = useSelector((state) => state.profile);
  const hiddenBackImageFile = React.useRef(null);
  const [resizedImage, setResizedImage] = useState(null);
  const dispatch = useDispatch();
  const [confirmedFile, setConfirmedFile] = useState(undefined);
  const [file, setFile] = useState(null);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const btnTxt = active
      ? `${String(account).substring(0, 6)}...${String(account).substring(38)}`
      : "Connect";
    setConnectBtnTxt(btnTxt);
  }, [active, false]);

  const connectWallet = async () => {
    try {
      await activate(injected);
      setItem("walletStatus", true);
    } catch (err) {
      console.log(err);
    }
  };

  const onImageClicked = () => {
    console.log("lll");
  };

  const onEditProfile = () => {
    props.history.push("/edit-profile");
  };

  const onBackgroundEdit = () => {
    hiddenBackImageFile.current.click();
  };

  const onInputBackImageChanged = (event) => {
    setFile(event.target.files[0]);
  };
  return (
    <Container maxWidth="xl" sx={{ marginTop: "100px" }}>
      <section className="profile-info-bar">
        <div
          style={{
            width: "100%",
            top: "-75%",
            position: "absolute",
            height: "300px",
            backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}${userInfo.backgroundImageUrl})`,
            backgroundSize: "cover",
          }}
        >
          <div className="edit-part">
            <Tooltip title="Edit Background">
              <IconButton onClick={onBackgroundEdit}>
                <Edit
                  fontSize="large"
                  sx={{
                    backgroundColor: "#da4bfd",
                    borderRadius: "50%",
                    padding: "5px",
                    color: "white",
                  }}
                />
              </IconButton>
            </Tooltip>

            <input
              type="file"
              ref={hiddenBackImageFile}
              name="profile-back"
              id="profile-back"
              accept=".jpg, .png, .jpeg, .bmp"
              onChange={onInputBackImageChanged}
              className="file-input"
            />
            <MImageCropper
              file={file}
              onConfirm={(croppedFile) => {
                setResizedImage(window.URL.createObjectURL(croppedFile));
                setConfirmedFile(croppedFile);
                let data = new FormData();
                data.append("file_back", croppedFile);
                dispatch(profileBackgroundUpdate(data));
              }}
              onCompleted={() => setFile(null)}
            />
          </div>
        </div>

        <Tooltip title="Edit Profile">
          <Button className="profile-image" onClick={onImageClicked}>
            <img
              src={
                process.env.REACT_APP_BACKEND_URL + userInfo.avatar_url ||
                "/images/profile-images/profile-empty.png"
              }
            />
          </Button>
        </Tooltip>

        <div className="wallet-address">
          <MClipboard>
            {({ copy }) =>
              active ? (
                <Button
                  className="profile-connect-btn"
                  onClick={() => copy(account)}
                >
                  <span className="token-image">
                    <img src="/images/crypto-icons/brise.png" />
                  </span>
                  <span className="indicator connected"></span>
                  {connectBtnTxt}
                </Button>
              ) : (
                <Button className="profile-connect-btn" onClick={connectWallet}>
                  <span className="indicator not-connected"></span>
                  {connectBtnTxt}
                </Button>
              )
            }
          </MClipboard>
        </div>
        <div className="bio-text">
          <p>{userInfo.bio || ""}</p>
        </div>
        <div className="personal">
          <a
            href={`https://${userInfo.personalSite}`}
            target="_blank"
            style={{ color: "#999" }}
          >
            <b>@{userInfo.personalSite || ""}</b>
          </a>
        </div>
        <div className="following-bar">
          <label>
            <span className="count">{userInfo.followers_num}</span>
            <span className="static-string">followers</span>
          </label>
          <label>
            <span className="count">{userInfo.followings_num}</span>
            <span className="static-string">following</span>
          </label>
        </div>
        <div className="edit-profile">
          <MBorderButton onClick={onEditProfile}>
            <Settings sx={{ fontSize: "16px" }} />
            &nbsp;Edit Profile
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
    </Container>
  );
};

export default MyProfile;
