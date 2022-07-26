import * as React from "react";
import { useEffect, useState } from "react";

import {
  List,
  Typography,
  Chip,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
} from "@mui/material";

import {
  Image as ImageIcon,
  Delete as DeleteIcon,
  NewReleases,
  Visibility,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReportData,
  markRead,
  onReportDelete,
} from "src/store/data/actions";
import { walletAddressAbbr } from "src/utils/helper";

const Reports = () => {
  const dispatch = useDispatch();
  const reportsData = useSelector((state) => state.data?.reports);
  console.log("repots", reportsData);
  useEffect(() => {
    dispatch(fetchReportData());
    return () => {
      dispatch(markRead());
    };
  }, []);

  const onDeleteClicked = (eve, id) => {
    dispatch(onReportDelete(id));
  };

  return (
    <List
      sx={{ width: "100%", margin: "0 auto", bgcolor: "background.paper" }}
      dense={true}
    >
      {reportsData?.map((item, index) => {
        return (
          <ListItem
            key={"Reports" + index}
            secondaryAction={
              <>
                {item.status == 0 && (
                  <Chip
                    label="NEW"
                    color="error"
                    variant="contained"
                    icon={<NewReleases />}
                  />
                )}

                <IconButton
                  edge="end"
                  aria-label="delete"
                  sx={{ marginLeft: "10px" }}
                  onClick={(eve) => onDeleteClicked(eve, item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <Chip
                    label={
                      item?.user?.nickName ||
                      walletAddressAbbr(item?.user?.wallet_address)
                    }
                    avatar={
                      <Avatar alt="Natacha" src={item?.user.avatar_url} />
                    }
                  />
                  {" — "}
                  <Chip
                    avatar={
                      <Avatar alt="Natacha" src={item?.reportUser.avatar_url} />
                    }
                    label={
                      item?.reportUser?.nickName ||
                      walletAddressAbbr(item?.reportUser?.wallet_address)
                    }
                  />
                </>
              }
              secondary={
                <Typography mt={1} sx={{ color: "#bdbdbd !important" }}>
                  {item?.content}
                </Typography>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default Reports;
