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
import styled from "styled-components";

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
        <ButtonContainer>
          <BrowseButton>Create a collection</BrowseButton>
          <ImportButton>Import an existing</ImportButton>
        </ButtonContainer>
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
  flex: "1 1",
  color: "#aaa",
  fontSize: "12px",
  lineHeight: "1",
  padding: "7px 15px !important",

  border: "1px solid #555",
  textTransform: "none",
  borderRadius: "30px",
  margin: "5px",
}));

const ButtonContainer = styled.div`
  text-align: center;
  display: flex;
`;

export default OnSale;
