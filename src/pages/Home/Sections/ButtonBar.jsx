import React from "react";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const ButtonBar = () => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="button-bar">
      <FormGroup className="spinBox">
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="On Sale"
        />
      </FormGroup>

      <Button className="btn outline category-btn">
        <img src="/images/home/art.svg"></img>Art
      </Button>
      <Button className="btn outline category-btn">
        <img src="/images/home/music.svg"></img>Music
      </Button>
      <Button className="btn outline category-btn">
        <img src="/images/home/ticket.svg"></img>Ticket
      </Button>
      <Button className="btn outline category-btn">
        <img src="/images/home/community.svg"></img>Community
      </Button>
      <Button className="btn outline category-btn">
        <img src="/images/home/moments.svg"></img>Moments
      </Button>
      <Button className="btn outline category-btn">
        <img src="/images/home/default.svg"></img>Asset
      </Button>
    </div>
  );
};

export default ButtonBar;
