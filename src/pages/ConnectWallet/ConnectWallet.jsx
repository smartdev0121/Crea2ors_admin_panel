import React from "react";
import { Container, Box, Stack } from "@mui/material";
import MColorButtonView from "../../components/MInput/MColorButtonView";
import { LockOpen } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  showWeb3WalletModal,
  getCurrentWalletAddress,
} from "../../utils/wallet";
import { connectedWallet } from "src/store/wallet/actions";
import { setItem } from "../../utils/storage";

const ConnectWallet = (props) => {
  const dispatch = useDispatch();

  const onConnectWallet = async () => {
    const provider = await showWeb3WalletModal();
    const walletAddress = await getCurrentWalletAddress();
    dispatch(connectedWallet(walletAddress));
    setItem("walletStatus", true);
  };
  return (
    <Container maxWidth="xs" sx={{ marginTop: "100px", marginBottom: "20px" }}>
      <Box
        sx={{
          p: 2,
          backgroundColor: "#36363666",
          padding: "20px",
        }}
      >
        <section className="header">
          <LockOpen
            fontSize="large"
            sx={{
              backgroundColor: "#da4bfd",
              borderRadius: "50%",
              padding: "5px",
              color: "white",
            }}
          />
          <h2>Connect to your wallet</h2>
          <p className="grey-txt">
            For creating collections and NFTs and Buying them, please connect to
            your wallet
          </p>
        </section>
        <Stack sx={{ padding: "10px" }}>
          <MColorButtonView onClick={onConnectWallet}>
            Connect Wallet
          </MColorButtonView>
        </Stack>
        <section className="link-part">
          <Link to="/#">Install Wallet Extension</Link>
        </section>
      </Box>
    </Container>
  );
};

export default ConnectWallet;
