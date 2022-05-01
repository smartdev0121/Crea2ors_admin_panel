import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaHome, FaImages, FaLayerGroup } from "react-icons/fa";
import { useSelector } from "react-redux";
import MSearch from "src/components/MSearch";
import { useDispatch } from "react-redux";
import "./HeaderContent.scss";

const HeaderContent = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
  };

  const handleMenuClicked = (e) => {
    if (e.target.localName !== "a") {
      return;
    }
    setMenuOpened(true);
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
