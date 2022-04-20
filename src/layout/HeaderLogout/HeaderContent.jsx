import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import {
  FaHome,
  FaCuttlefish,
  FaArtstation,
  FaImages,
  FaLayerGroup,
} from "react-icons/fa";

import networks from "src/config/network";
import {
  showWeb3WalletModal,
  disconnectWallet,
  getCurrentWalletAddress,
  switchNetwork,
  getCurrentNetworkId,
} from "src/utils/wallet";
import { getUserRole } from "src/utils/permission";
import { useSelector } from "react-redux";
import MSearch from "src/components/MSearch";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth/actions";
import { apiGetAccountInfo } from "src/utils/api";
import MClipboard from "../../components/MClipboard";
import "./HeaderContent.scss";

const HeaderContent = () => {
  const [connectedStatus, setConnectedStatus] = useState(false);
  const [currentNetwork, setCurrentNetwork] = useState(1);
  const [connectBtnTxt, setConnectBtnTxt] = useState("Not Connected");
  const [accountInfo, setAccountInfo] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [menuOpened, setMenuOpened] = useState(false);
  const [whitelisted, setWhitelisted] = useState(false);
  const dispatch = useDispatch();
  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
  };

  const handleMenuClicked = (e) => {
    if (e.target.localName !== "a") {
      return;
    }

    setMenuOpened(false);
  };

  return (
    <section className="header-content">
      <div className="desktop-header">
        <div className="logo">
          <a href="/">
            <img src="/logo-icon.svg" alt="logo-icon" className="logo-icon" />
          </a>
        </div>

        <div className="search-bar">
          <MSearch />
        </div>

        <div className="links">
          <Link to="/#" className="header-item">
            MARKET
          </Link>
          <Link className="header-item" to="/create-collection">
            REDEEM
          </Link>
          <Link to="/#" className="header-item">
            ABOUT
          </Link>
          <Link to="/#" className="header-item">
            HELP
          </Link>
          <Link className="header-item" to="/sign-in">
            SIGN IN/SIGNUP
          </Link>
        </div>
      </div>

      <div className="mobile-header">
        <div className="logo">
          <a href="/">
            <img src="/logo-icon.svg" alt="logo-icon" className="logo-icon" />
          </a>
        </div>

        <div className="mobile-menu-button" onClick={toggleMenu}>
          <span />
          <span />
          <span />
        </div>

        <div className={`mobile-menu-wrap ${menuOpened && "opened"}`}>
          <ProSidebar>
            <Menu iconShape="square" onClick={handleMenuClicked}>
              <MenuItem icon={<FaHome />}>
                Home <Link to="/" />
              </MenuItem>
              {whitelisted && (
                <>
                  <MenuItem icon={<FaCuttlefish />}>
                    Create a Collection <Link to="/create-collection" />
                  </MenuItem>
                  <MenuItem icon={<FaArtstation />}>
                    Batch Transfer NFTs <Link to="/batch-transfer" />
                  </MenuItem>
                </>
              )}
              <SubMenu title="Collections" icon={<FaLayerGroup />}>
                <MenuItem>
                  All Collections <Link to="/explore-collections" />
                </MenuItem>
                <MenuItem>
                  My Collections <Link to="/collections" />
                </MenuItem>
              </SubMenu>

              <SubMenu title="NFTs" icon={<FaImages />}>
                <MenuItem>
                  All NFTs <Link to="/explore-assets" />
                </MenuItem>

                <MenuItem>
                  My NFTs <Link to="/assets" />
                </MenuItem>
              </SubMenu>
            </Menu>
          </ProSidebar>
        </div>
      </div>
    </section>
  );
};

export default HeaderContent;
