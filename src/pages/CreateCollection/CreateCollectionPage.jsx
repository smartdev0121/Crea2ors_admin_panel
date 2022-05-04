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
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/system";
import MColorButtonView from "src/components/MInput/MColorButtonView";
import TextField from "@mui/material/TextField";
import { Form, Field } from "react-final-form";
import { useWeb3React } from "@web3-react/core";
// import "./BackgroundAnimation.scss";

const Paragraph = styled("p")(
  ({ theme }) =>
    `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  margin: 10px 0;
  color: "white";
  background: "transparent";
  `
);

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
  const hiddenFileInput = React.useRef(null);
  const { library, account } = useWeb3React();

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

  const handleImageClick = (e) => {
    hiddenFileInput.current.click();
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

  const onSubmit = async (values) => {
    console.log(values);
    const parameter = {
      CollectionName: "A2FCreators",
      Symbol: "A2F",
      BatchSize: 5,
      TotalLimit: 20,
      Price: 100,
    };
    // const deployed = await deployContract(0, parameter);
  };

  const { result, uploader } = useDisplayImage();

  return (
    <div className="whole-container">
      <Container
        maxWidth="md"
        sx={{ paddingTop: "100px", paddingBottom: "20px" }}
      >
        <Box
          sx={{
            p: 2,
            backgroundColor: "#00000075",
          }}
        >
          <h4 level={4} className="create-nft-title">
            Create a New NFT Collection
          </h4>
          <Form
            onSubmit={onSubmit}
            validate={(values) => {
              const errors = {};
            }}
            render={({ handleSubmit, submitting, form, values, pristine }) => {
              return (
                <form onSubmit={handleSubmit} noValidate>
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                    justifyContent="space-around"
                  >
                    <Stack
                      className="create-collection-card"
                      spacing={1}
                      flex="1 1"
                    >
                      <Field
                        type="text"
                        name="collectionName"
                        label="Title"
                        onChange={(e) => handleInputChange(e, "CollectionName")}
                        component={MTextField}
                        variant="standard"
                      />

                      <Field
                        type="text"
                        placeholder="Description"
                        onChange={(e) => handleInputChange(e, "Description")}
                        label="Collection details and information"
                        name="description"
                        component={MTextField}
                        variant="standard"
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
                        <Field
                          type="text"
                          label="URL"
                          name="url"
                          component={MTextField}
                        />
                      </Stack>

                      <Field
                        type="text"
                        name="intro"
                        multiline
                        label="Highlight Intro"
                        component={MTextField}
                        variant="standard"
                      />
                      <Field
                        name="type"
                        values={categories}
                        component={MSelectBox}
                      />
                      <p>
                        If you coudln't define your category in this list,
                        please include it with #
                      </p>
                      <Field
                        type="text"
                        name="subCategory"
                        multiline
                        component={MTextField}
                        placeholder="#Weapon"
                        variant="standard"
                      />
                      <Field
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <ProductionQuantityLimitsIcon
                                sx={{ color: "#bdbdbd" }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        type="number"
                        name="tokenLimit"
                        placeholder="#Weapon"
                        variant="standard"
                        component={MTextField}
                      />

                      <Paragraph>
                        All our collections are Free or Lazy minted. This means
                        the buyer will pay for the minting of the collectable
                      </Paragraph>
                      <MColorButtonView type="submit">
                        Create a collection
                      </MColorButtonView>
                    </Stack>
                    <Stack spacing={1} flex="1 1">
                      <label className="choose-image-text">Choose Image:</label>
                      <input
                        ref={hiddenFileInput}
                        type="file"
                        id="image-file"
                        accept=".jpg, .png, .jpeg, .bmp"
                        onChange={handleFileChange}
                        className="file-input"
                      />
                      <div
                        onClick={handleImageClick}
                        className="img-click-part"
                      >
                        <img
                          src={
                            result ||
                            metadata.ImageUrl ||
                            "/images/img_empty.png"
                          }
                          style={{ width: 300, height: "auto" }}
                          alt="collection"
                        />
                        <p>Upload file jpg, jpeg, png 900x400px max: 100MB</p>
                      </div>

                      <h2>{metadata.CollectionName}</h2>
                      <TextField>{metadata.CollectionTicker}</TextField>
                      <TextField value={metadata.Description} multiline>
                        {metadata.Description}
                      </TextField>
                    </Stack>
                  </Stack>
                </form>
              );
            }}
          />
        </Box>
      </Container>
    </div>
  );
};

export default CreateCollectionPage;
