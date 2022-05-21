import PropTypes from "prop-types";
// material
import { MenuItem, TextField } from "@mui/material";
import { useState } from "react";
// ----------------------------------------------------------------------

BlogPostsSort.propTypes = {
  options: PropTypes.array,
  onSort: PropTypes.func,
};

export default function BlogPostsSort({ options, onSort }) {
  const [curType, setCurType] = useState("All");
  const onChanged = (eve) => {
    setCurType(eve.target.value);
    onSort(eve.target.value);
  };
  return (
    <TextField select size="small" value={curType} onChange={onChanged}>
      {options?.map((option) => (
        <MenuItem key={option.name} value={option.name}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
}
