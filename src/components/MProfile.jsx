import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import {
  ClosedCaptionDisabled,
  Logout,
  Settings,
  PersonAdd,
  ManageAccounts,
  Collections,
  Extension,
  NoteAdd,
} from "@mui/icons-material";

const AccountMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Link to="/my-profile">
            <ListItemIcon>
              <ManageAccounts fontSize="small" />
            </ListItemIcon>
            My Profile
          </Link>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Collections fontSize="small" />
          </ListItemIcon>
          My Collections
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Extension fontSize="small" />
          </ListItemIcon>
          My NFTs
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <NoteAdd fontSize="small" />
          </ListItemIcon>
          Create Collection
        </MenuItem>
        <Divider />

        <MenuItem onClick={props.onDisconnect}>
          <ListItemIcon>
            <ClosedCaptionDisabled fontSize="small" />
          </ListItemIcon>
          Disconnect Wallet
        </MenuItem>
        <MenuItem onClick={props.onLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default AccountMenu;
