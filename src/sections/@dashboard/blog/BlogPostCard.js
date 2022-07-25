import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// material
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  Link,
  Chip,
  Card,
  Menu,
  MenuItem,
  Grid,
  IconButton,
  Avatar,
  Typography,
  CardContent,
} from "@mui/material";

import { MoreVert } from "@mui/icons-material";
// utils
import { fDate } from "../../../utils/formatTime";
import { fShortenNumber } from "../../../utils/formatNumber";
//
import SvgIconStyle from "../../../components/SvgIconStyle";
import Iconify from "../../../components/Iconify";
import { useDispatch, useSelector } from "react-redux";
import { modeChanged } from "src/store/data/actions";
// ----------------------------------------------------------------------
const ITEM_HEIGHT = 32;
const options = ["None", "Top", "Top_left", "Top_right", "Main_1", "Main_2"];

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function BlogPostCard({
  post,
  index,
  type,
  collectionId,
  category,
  homepageDatas,
}) {
  const { view, comment, share } = post;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;
  const [anchorEl, setAnchorEl] = useState(null);
  const [displayWalletAddr, setDisplayWalletAddr] = useState("");

  const newA = homepageDatas.filter((item, index) => {
    return item.collection_id == collectionId && category == item.category;
  });

  const [curMode, setCurMode] = useState(newA[0]?.mode);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    const walletAddress =
      String(post?.User?.wallet_address).substring(0, 6) +
      "..." +
      String(post?.User?.wallet_address).substring(38);
    setDisplayWalletAddr(walletAddress);
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuClicked = (eve, option) => {
    setCurMode(option);
    handleClose();
    dispatch(modeChanged(option, category, collectionId));
  };

  const POST_INFO = [
    { number: post?.owners?.length, icon: "eva:people-fill" },
    { number: post?.nfts?.length, icon: "eva:eye-fill" },
    { number: post?.token_limit, icon: "eva:share-fill" },
  ];

  return (
    <Grid item xs={12} sm={4} md={4}>
      <Card sx={{ position: "relative" }}>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          sx={{ position: "absolute", right: "5px", top: "5px", zIndex: "10" }}
        >
          <MoreVert />
        </IconButton>
        <MName>{curMode}</MName>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              selected={option === "Pyxis"}
              onClick={(eve) => menuClicked(eve, option)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
        <CardMediaStyle
          sx={{
            pt: "calc(100% * 4 / 3)",
            "&:after": {
              top: 0,
              content: "''",
              width: "100%",
              height: "100%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
            pt: {
              xs: "calc(100% * 4 / 3)",
              sm: "calc(100% * 3 / 4.66)",
            },
          }}
        >
          <SvgIconStyle
            color="paper"
            src="/static/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: "absolute",
              color: "background.paper",
              ...((latestPostLarge || latestPost) && { display: "none" }),
            }}
          />
          <Chip
            sx={{
              zIndex: 9,
              position: "absolute",
              top: 24,
              left: 24,
            }}
            label={post?.User?.nick_name || displayWalletAddr}
            avatar={
              <Avatar
                alt={post?.User?.nick_name}
                src={post?.User?.avatar_url}
              />
            }
          />

          <CoverImgStyle alt={post?.name} src={post?.image_url} />
        </CardMediaStyle>

        <CardContent
          sx={{
            pt: 4,

            bottom: 0,
            width: "100%",
            position: "absolute",
          }}
        >
          <TitleStyle
            to="#"
            color="inherit"
            variant="subtitle2"
            underline="hover"
            component={RouterLink}
          >
            {post.name}
          </TitleStyle>

          <InfoStyle>
            {POST_INFO.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  ml: index === 0 ? 0 : 1.5,
                }}
              >
                <Iconify
                  icon={info.icon}
                  sx={{ width: 16, height: 16, mr: 0.5 }}
                />
                <Typography variant="caption">
                  {fShortenNumber(info.number)}
                </Typography>
              </Box>
            ))}
          </InfoStyle>
        </CardContent>
      </Card>
    </Grid>
  );
}

const MName = styled("h3")({
  fontFamily: "Paytone One",
  color: "#202020",
  backgroundColor: "#890b0b",
  padding: "4px 5px",
  backdropFilter: "blur(4px)",
  letterSpacing: "0px",
  position: "absolute",
  zIndex: "10",
  fontSize: "15px",
  top: " 45px",
  right: "0",
  borderTopLeftRadius: "20px",
  borderBottomLeftRadius: "20px",
  // span {
  //   display: "block",
  //   fontSize: "15px",
  //   color: "#f1ebe5 !important",
  //   letterSpacing: "0px",
  // }
});

const CardMediaStyle = styled("div")({
  position: "relative",
  paddingTop: "calc(100% * 3 / 4)",
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: "hidden",
  WebkitLineClamp: 2,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: "absolute",
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const InfoStyle = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const CoverImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});
