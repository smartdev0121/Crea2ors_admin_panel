import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

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

import MSearch from "src/components/MSearch";
import { apiGetAccountInfo } from "src/utils/api";

const HeaderContent = () => {
  const loading = useSelector((state) => state.loading.value);

  const [connectedStatus, setConnectedStatus] = useState(false);
  const [currentNetwork, setCurrentNetwork] = useState(1);
  const [connectBtnTxt, setConnectBtnTxt] = useState("Create");
  const [accountInfo, setAccountInfo] = useState(null);
  const [menuOpened, setMenuOpened] = useState(false);
  const [whitelisted, setWhitelisted] = useState(false);

  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
  };

  const handleSwitchNetwork = async (value) => {
    if (connectedStatus) {
      const res = await switchNetwork(value);
      if (res) {
        setCurrentNetwork(value);
      }
    } else {
      setCurrentNetwork(value);
    }
  };

  const handleConnect = async () => {
    if (connectedStatus) {
      disconnectWallet().then(() => {
        setConnectedStatus(false);
        window.location.reload();
      });
    } else {
      showWeb3WalletModal().then(() => {
        setConnectedStatus(true);
        window.location.reload();
      });
    }
  };

  const handleMenuClicked = (e) => {
    if (e.target.localName !== "a") {
      return;
    }

    setMenuOpened(false);
  };

  useEffect(() => {
    const setUserRole = async () => {
      const role = await getUserRole();
      setWhitelisted(role);
    };

    setUserRole();
  }, []);

  useEffect(() => {
    const doWalletStuff = async () => {
      const acct = await getCurrentWalletAddress();
      if (acct) {
        const btnTxt = `Connected: ${String(acct).substring(0, 6)}...${String(
          acct
        ).substring(38)}`;

        const res = await apiGetAccountInfo(acct);

        setAccountInfo(res);
        setConnectBtnTxt(btnTxt);
        setConnectedStatus(true);
      } else {
        setConnectBtnTxt("Create");
      }
    };
    const getNetwork = async () => {
      const id = await getCurrentNetworkId();
      if (id) {
        setCurrentNetwork(id);
      }
    };

    doWalletStuff();
    getNetwork();
  }, [connectedStatus, loading]);

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
          <Link className="header-item">MARKET</Link>
          <Link className="header-item" to="/create-collection">
            REDEEM
          </Link>
          <Link className="header-item">ABOUT</Link>
          <Link className="header-item">HELP</Link>
          <Link className="header-item" to="/sign-in">
            SIGN IN/SIGNUP
          </Link>
        </div>

        <div className="wallet-connect">
          <Button className="btn btn-primary" onClick={handleConnect}>
            {connectBtnTxt}
          </Button>

          <Link to={`/account`}>
            <Avatar
              src={
                accountInfo
                  ? accountInfo.PhotoStorageKey
                  : "/images/img_error.png"
              }
              alt="profile"
            />
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
          <div className="wallet-connect">
            <select
              onChange={(e) => handleSwitchNetwork(e.target.value)}
              value={currentNetwork}
            >
              {Object.keys(networks).map((networkId) => (
                <option value={networkId} key={`network_option${networkId}`}>
                  {networks[networkId].chainName}
                </option>
              ))}
            </select>

            <button type="primary" onClick={handleConnect}>
              {connectBtnTxt}
            </button>
          </div>

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
