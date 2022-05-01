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
      <section className="content">
        <h4>No collections found</h4>
        <p>
          We couldn't find any of your collections. Looks like you don't have
          any
        </p>
        <div className="button-container">
          <BrowseButton>Create a collection</BrowseButton>
          <ImportButton>Import an existing</ImportButton>
        </div>
      </section>
    </div>
  );
};

const BrowseButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: "#da4bfd",
  textTransform: "none",
  padding: "7px 15px !important",
  borderRadius: "30px",
  display: "block",
  flex: "1 1",
  "&:hover": {
    backgroundColor: "#da4bfd",
  },
}));

const ImportButton = styled(Button)(({ theme }) => ({
  display: "block",
  color: "#aaa",
  textTransform: "none",
  border: "1px solid #777",
  marginTop: "5px",
  padding: "7px 13px !important",
  borderRadius: "30px",
  display: "block",
  flex: "1 1",
}));

export default OnSale;
