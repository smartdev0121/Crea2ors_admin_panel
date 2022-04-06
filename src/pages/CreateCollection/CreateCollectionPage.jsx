import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "src/slices/loadingSlice";
import { CONTRACT_TYPE } from "src/config/global";
import { deployContract } from "src/utils/contract";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "./CreateCollectionPage.scss";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import MTextField from "src/components/MInput/MTextField";
import MSelectBox from "src/components/MInput/MSelectBox";

const CreateCollectionPage = () => {
  const dispatch = useDispatch();
  const categories = [
    "Art",
    "Music",
    "Ticket",
    "Community",
    "Moments",
    "Asset",
  ];
  const [contractType, setContractType] = useState(0);
  const [file, setFile] = useState();
  const [metadata, setMetadata] = useState({});
  const [vidStatus, setVidStatus] = useState(false);

  const useDisplayImage = () => {
    const [result, setResult] = React.useState("");

    const uploader = (e) => {
      const imageFile = e.target.files[0];

      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        setResult(e.target.result);
      });

      reader.readAsDataURL(imageFile);
    };

    return { result, uploader };
  };

  const handleInputChange = (e, key) => {
    setMetadata((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleFileChange = (e) => {
    uploader(e);
    setFile(e.target.files[0]);
  };

  const handleCreateCollection = async () => {
    dispatch(setLoading(true));
    try {
      await deployContract(contractType, { ...metadata, file: file });
      dispatch(setLoading(false));
    } catch {
      dispatch(setLoading(false));
    }
  };

  const handleCheckboxChange = (e) => {
    setVidStatus(e.target.checked);
  };

  const { result, uploader } = useDisplayImage();

  return (
    <Container maxWidth="md" className="collection-create-container">
      <Box
        sx={{
          p: 2,
          backgroundColor: "#36363666",
        }}
      >
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          justifyContent="space-around"
        >
          <Stack className="create-collection-card" spacing={1} flex="1 1">
            <h4 level={4}>Create a New NFT Collection</h4>
            <MTextField
              onChange={(e) => handleInputChange(e, "CollectionName")}
              label="Title"
            />

            {/* <input
              placeholder="Collection Ticker"
              onChange={(e) => handleInputChange(e, "CollectionTicker")}
            /> */}

            {/* <input
              placeholder="Royalty percentage"
              onChange={(e) => handleInputChange(e, "RoyaltyFee")}
            /> */}

            {/* <input
              placeholder="Royalty wallet address"
              onChange={(e) => handleInputChange(e, "RoyaltyAddress")}
            /> */}
            <MTextField
              placeholder="Description"
              onChange={(e) => handleInputChange(e, "Description")}
              label="Collection details and information."
              multiline
            />
            <Stack direction="row" alignItems="center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={vidStatus}
                    onChange={handleCheckboxChange}
                  />
                }
                label="add vid"
              />
              <MTextField label="URL" />
            </Stack>

            <MTextField
              placeholder="External URL"
              onChange={(e) => handleInputChange(e, "ExternalUrl")}
            />

            <MTextField label="About the Authors" multiline />
            <MTextField label="Highlight Intro" multiline />
            <MSelectBox values={categories} />
            <h5>{metadata.CollectionName}</h5>
            <span>{metadata.CollectionTicker}</span>
            <span>{metadata.Description}</span>
            <button onClick={handleCreateCollection}>
              Create a collection
            </button>
          </Stack>
          <Stack spacing={1} flex="1 1">
            <label>Choose Image:</label>
            {/* <FileUploader multiple={true} handleChange={handleFileChange} name='file' types={fileTypes} /> */}
            <input
              type="file"
              id="image-file"
              accept=".jpg, .png, .jpeg, .bmp"
              onChange={(e) => handleFileChange(e)}
            />
            <img
              src={result || metadata.ImageUrl || "/images/img_error.png"}
              style={{ width: 300, height: "auto" }}
              alt="collection"
            />
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default CreateCollectionPage;
