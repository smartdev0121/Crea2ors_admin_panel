import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import {
  Web,
  Widgets,
  Category,
  MonetizationOn,
  MobiledataOff,
} from "@mui/icons-material";

const OnSale = () => {
  const [age, setAge] = React.useState(10);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className="tab-container">
      <section className="button-bar">
        <div>
          <BarButton className="edit-btn">
            <Web sx={{ fontSize: "14px" }} />
            &nbsp;Blockchain
          </BarButton>
          <BarButton className="edit-btn">
            <Widgets sx={{ fontSize: "14px" }} />
            &nbsp;Category
          </BarButton>
          <BarButton className="edit-btn">
            <Category sx={{ fontSize: "14px" }} />
            &nbsp;Collection
          </BarButton>
          <BarButton className="edit-btn">
            <MonetizationOn sx={{ fontSize: "14px" }} />
            &nbsp;Price range
          </BarButton>
        </div>
        <FormControl size="small">
          <BarSelect
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Recently Added</MenuItem>
            <MenuItem value={20}>Price: Low to High</MenuItem>
            <MenuItem value={30}>Price: High to Low</MenuItem>
            <MenuItem value={30}>Auction ending soon</MenuItem>
          </BarSelect>
        </FormControl>
      </section>
      <section className="content">
        <h4>No items found</h4>
        <p>
          Come back soon! Or try to browse something for you on our marketplace
        </p>
        <BrowseButton>Browse marketplace</BrowseButton>
      </section>
    </div>
  );
};

const BarSelect = styled(Select)(({ theme }) => ({
  border: "1px solid #666",
  color: "#aaa",
  fontSize: "12px",
  textTransform: "none",
  borderRadius: "30px",
  padding: "0px 10px",
  margin: "5px",
  "> div": {
    padding: "4px 5px !important",
    paddingRight: "20px !important",
  },
  "&:selected": {
    outline: "none",
  },
}));

const BrowseButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: "#da4bfd",
  textTransform: "none",
  padding: "7px 15px !important",
  borderRadius: "30px",
  "&:hover": {
    backgroundColor: "#da4bfd",
  },
}));

const BarButton = styled(Button)(({ theme }) => ({
  color: "#aaa",
  fontSize: "12px",
  lineHeight: "1",
  padding: "5px 13px !important",
  border: "1px solid #555",
  textTransform: "none",
  borderRadius: "30px",
  margin: "5px",
}));

export default OnSale;
