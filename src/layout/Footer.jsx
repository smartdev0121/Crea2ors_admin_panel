import React from "react";
import { Link } from "react-router-dom";

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
    <footer>
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

        <section className="item-section">
          <img src="/images/footer-logo.svg" alt="Footer logo" />

          <div className="item-links">
            <div className="about-us">
              <p>
                The largest great market place for crypto collectibles and
                non-fungible tokens (NFTs)
              </p>
            </div>

            {Object.keys(itemLinks).map((key) => {
              return (
                <div key={key} className="site-links">
                  <span>{key}</span>
                  {itemLinks[key].map((link) => (
                    <div key={link.text}>
                      <Link to={link.link}>{link.text}</Link>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </section>

        <section className="copyright-section">
          <p>© Copyright xxxNifty Global Inc. 2022. All Rights Reserved</p>
          <div className="copyright-links">
            <Link>Terms of Service</Link>
            <Link>Privacy Policy</Link>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
