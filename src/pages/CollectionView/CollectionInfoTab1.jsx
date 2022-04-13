import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DetailInfo from "./DetailInfo";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{
              minHeight: "20px",
              ".MuiTabs-indicator": { backgroundColor: "#cbca03ba" },
            }}
          >
            <Tab
              label="SHOW DETAILS"
              value="1"
              sx={{
                color: "#c5c5c5",
                fontSize: "12px",
                minHeight: "20px",
                alignItems: "center",
                backgroundColor: "#da4bfd",
                borderRadius: "10px",
                padding: "10px",
                margin: "5px",
                "&.Mui-selected": { color: "white" },
              }}
            />
            <Tab
              label="ABOUT"
              value="2"
              sx={{
                color: "#c5c5c5",
                fontSize: "12px",
                minHeight: "20px",
                backgroundColor: "#da4bfd",
                padding: "10px",
                margin: "5px",
                alignItems: "center",
                borderRadius: "10px",

                "&.Mui-selected": { color: "white" },
              }}
            />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ paddingLeft: "0px" }}>
          <DetailInfo />
        </TabPanel>
        <TabPanel value="2" sx={{ color: "white" }}>
          The "Romero Britto" NFT visual album collection, available exclusively
          on Yellowheart, includes ten digital music masterpieces produced by
          the famous DJ White system.
        </TabPanel>
      </TabContext>
    </Box>
  );
}
