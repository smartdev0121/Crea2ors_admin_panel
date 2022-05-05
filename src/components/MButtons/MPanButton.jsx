import { styled } from "@mui/material/styles";
import {
  
  ToggleButton,
  
} from "@mui/material";

export const MPanButton = styled(ToggleButton)((theme) => ({
  color: "#e0dfff",
  background: "transparent",
  borderRadius: "20px",
  textTransform: "none",
  border: "1px solid #5c5c5c",
  margin: "5px",
  "&:hover": {
    borderColor: "#394dd999",
  },
  "&:active": {
    borderColor: "#394dd999",
  },
}));


