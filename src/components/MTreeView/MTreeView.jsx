import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import {
  List,
  Container,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  DialogTitle,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Adjust from "@mui/icons-material/Adjust";
import Delete from "@mui/icons-material/Delete";
import CategoryIcon from "@mui/icons-material/Category";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useDispatch } from "react-redux";
import {
  fetchCategoryData,
  newCategoryAdded,
  CategoryDelete,
} from "src/store/data/actions";

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;
  const [open, setOpen] = React.useState(false);
  const [deleteItemIndex, setDeleteItemIndex] = React.useState(0);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
    dispatch(CategoryDelete(deleteItemIndex));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onDeleted = (eve, index) => {
    setDeleteItemIndex(index);
    handleClickOpen();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to delete category?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            In case remove category, all subcategories will be removed!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClickOpen} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <StyledTreeItemRoot
        label={
          <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
            <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />

            <Typography
              variant="body2"
              sx={{ fontWeight: "inherit", flexGrow: 1 }}
            >
              {labelText}
            </Typography>
            <Typography variant="caption" color="inherit">
              {labelInfo}
              {!props.leaf && (
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={(eve) => onDeleted(eve, props.nodeId)}
                >
                  <Delete />
                </IconButton>
              )}
            </Typography>
          </Box>
        }
        style={{
          "--tree-view-color": color,
          "--tree-view-bg-color": bgColor,
        }}
        {...other}
      />
    </>
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

export default function GmailTreeView(props) {
  return (
    <TreeView
      aria-label="gmail"
      defaultExpanded={["3"]}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ flexGrow: 1, overflowY: "none" }}
    >
      {props.array.map((parent, index) => (
        <StyledTreeItem
          nodeId={parent.id}
          labelText={parent.name}
          labelIcon={CategoryIcon}
        >
          {parent?.nodes &&
            parent.nodes.map((node, index) => (
              <StyledTreeItem
                nodeId={node.id}
                leaf={true}
                labelText={node.name}
                labelIcon={Adjust}
                // labelInfo="90"
                color="#1a73e8"
                bgColor="#2a2a2a"
              />
            ))}
        </StyledTreeItem>
      ))}
    </TreeView>
  );
}
