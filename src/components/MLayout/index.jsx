import React from "react";
import { Container, Box } from "@mui/material";
import styled from "styled-components";

export const MContainer = styled(Container)`
  margin-top: 100px;
  margin-bottom: 20px;
`;

export const MBox = styled(Box)`
  margin: 15px;
`;

export const MFlexBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const MRoundBox = styled(Box)`
  background: #23253685;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 10px;
`;
