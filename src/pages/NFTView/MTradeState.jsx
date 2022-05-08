import * as React from "react";
import Tabs from "@mui/material/Tabs";
import { Tab, Stack, Box, Typography, Avatar } from "@mui/material";
import { PeopleAlt, Sell } from "@mui/icons-material";
import MSellTable from "./MSellTable";
import styled from "styled-components";

export default function IconLabelTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon label tabs example"
      >
        <MTab
          icon={<PeopleAlt fontSize="small" />}
          label="Owners"
          sx={{ fontSize: "12px !important" }}
        ></MTab>
        <MTab
          icon={<Sell fontSize="small" />}
          label="Onsale"
          sx={{ fontSize: "12px !important" }}
        ></MTab>
      </Tabs>
      <TabPanel value={value} index={0}>
        <Stack>
          <UserRow>
            <Avatar
              src={
                "http://localhost:8080/images/admin-file_attachment-1651427661179.jpeg"
              }
              sx={{ width: 24, height: 24 }}
            />
            &nbsp;NeedleDev
          </UserRow>
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MSellTable />
      </TabPanel>
    </>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const MTab = styled(Tab)`
  color: #aaa !important;
  font-size: 13px !important;
  &.Mui-selected {
    color: #eee !important;
  }
`;

const UserRow = styled.div`
  display: flex;
`;
