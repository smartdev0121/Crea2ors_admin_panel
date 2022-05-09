import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import styled from "styled-components";

const NFTInfoBox = (props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const traitsJson = JSON.parse(props?.traits);
  return (
    <div>
      <MAccordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMore sx={{ color: "#bbb" }} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <MTypography>Description</MTypography>
        </AccordionSummary>
        <AccordionDetails>
          <MTypography>{props.description}</MTypography>
        </AccordionDetails>
      </MAccordion>
      <MAccordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMore sx={{ color: "#bbb" }} />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <MTypography sx={{ width: "33%", flexShrink: 0 }}>
            Properties
          </MTypography>
        </AccordionSummary>
        <AccordionDetails>
          <MTypography>
            {traitsJson.map((item, index) => {
              return (
                <MTypography key={"traits" + index}>
                  {item["propName_" + index]}: {item["propValue_" + index]}
                </MTypography>
              );
            })}
          </MTypography>
        </AccordionDetails>
      </MAccordion>
    </div>
  );
};

export default NFTInfoBox;

const MAccordion = styled(Accordion)`
  background-color: #1e1f24 !important;
`;

const MTypography = styled(Typography)`
  width: 100%;
  flexshrink: 0;
  color: #ccc !important;
`;
