import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const communityLinks = ["telegram", "discord", "twitter", "instagram"];

const itemLinks = {
  "My Account": [
    {
      text: "Profile",
      link: "/",
    },
    {
      text: "Favourites",
      link: "/",
    },
    {
      text: "Watchlist",
      link: "/",
    },
    {
      text: "My Collections",
      link: "/",
    },
    {
      text: "Settings",
      link: "/",
    },
    {
      text: "Stats",
      link: "/",
    },
    {
      text: "Rankings",
      link: "/",
    },
    {
      text: "Activity",
      link: "/",
    },
  ],

  Resources: [
    {
      text: "Help Center",
      link: "/",
    },
    {
      text: "Platform Status",
      link: "/",
    },
    {
      text: "Partners",
      link: "/",
    },
    {
      text: "Blog",
      link: "/",
    },
    {
      text: "Newsletter",
      link: "/",
    },
    {
      text: "Terms of Service",
      link: "/",
    },
    {
      text: "Privacy Policy",
      link: "/",
    },
    {
      text: "Refund Policy",
      link: "/",
    },
    {
      text: "2257 Compliance",
      link: "/",
    },
  ],
};

const Footer = () => {
  return (
    <MFooter>
      <div className="container">
        <section className="contact-section">
          <div className="join-malling">
            <span>Join our mallinglist</span>
            <p>
              Join our mailing list to stay in the loop with our newest feature
              releases, NFT drops, and tips and tricks.
            </p>

            <form>
              <input type="email" placeholder="Your email address" />
              <button className="btn">Sign up</button>
            </form>
          </div>
          <div className="join-community">
            <span>Join the community</span>
            <div className="community-links">
              {communityLinks.map((link) => (
                <div className="community-link" key={link}>
                  <img
                    src={`/images/community-icons/${link}.svg`}
                    alt="Community icons"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="copyright-section">
          <p>© Copyright xxxNifty Global Inc. 2022. All Rights Reserved</p>
          <div className="copyright-links">
            <Link to="/#">Terms of Service</Link>
            <Link to="/#">Privacy Policy</Link>
          </div>
        </section>
      </div>
    </MFooter>
  );
};

export default Footer;

const MFooter = styled.footer`
  margin-top: auto;
  border-top: 1px solid #333;
`;
