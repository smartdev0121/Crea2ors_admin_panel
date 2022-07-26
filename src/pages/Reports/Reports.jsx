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
} from "@mui/material";

import ImageIcon from "@mui/icons-material/Image";
import { useDispatch, useSelector } from "react-redux";
import { fetchReportData } from "src/store/data/actions";
import { walletAddressAbbr } from "src/utils/helper";

const Reports = () => {
  const dispatch = useDispatch();
  const reportsData = useSelector((state) => state.data?.reports);
  console.log("repots", reportsData);
  useEffect(() => {
    dispatch(fetchReportData());
  }, []);
  return (
    <List sx={{ width: "100%", margin: "0 auto", bgcolor: "background.paper" }}>
      {reportsData?.map((item, index) => {
        return (
          <ListItem key={"Reports" + index}>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Chip
                  label={
                    item?.user?.nickName ||
                    walletAddressAbbr(item?.user?.wallet_address)
                  }
                />
              }
              secondary={
                <React.Fragment>
                  <Chip
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                    label={
                      item?.reportUser?.nickName ||
                      walletAddressAbbr(item?.reportUser?.wallet_address)
                    }
                  />
                  {" — " + item?.content}
                </React.Fragment>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default Reports;
