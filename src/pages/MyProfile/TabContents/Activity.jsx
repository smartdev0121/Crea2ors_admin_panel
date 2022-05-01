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
        <h4>Nothing yet</h4>
        <p>Looks like there's still nothing. Activity will be shown here</p>
        <div className="button-container">
          <BrowseButton>Explore Crea2ors</BrowseButton>
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

export default OnSale;
