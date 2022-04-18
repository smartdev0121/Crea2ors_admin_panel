import axios from "axios";
import showNotification from "src/config/notification";

const pinata_gateway_url = "https://nftymeta.mypinata.cloud/ipfs/";

export const uploadContractMetadata = async (mt) =>
  new Promise(async (resolve, reject) => {
    try {
      let pinata_image_response = null;

      if (mt.file) {
        showNotification("Waiting", "Uploading Attachment Image...", "waiting");

        pinata_image_response = await pinFileToIPFS(mt.file);
        if (!pinata_image_response.success) {
          showNotification("Failed", "Uploading Image Failed", "failed", 3);
          return reject();
        }
      }

      showNotification("Waiting", "Uploading Metadata...", "waiting");

      let metadata = {
        ...mt,
        name: mt.CollectionName,
        symbol: mt.CollectionTicker,
        description: mt.Description,
        external_url: mt.ExternalUrl,
        image_url: pinata_image_response?.pinataUrl || mt.ImageUrl,
      };

      const pinata_response = await pinJSONToIPFS(metadata);
      if (!pinata_response.success) {
        showNotification("Failed", "Uploading Metadata Failed", "failed", 2000);
        return reject();
      }

      return resolve({
        contract_uri: pinata_response.pinataUrl,
      });
    } catch (e) {
      return reject();
    }
  });

export const uploadAssetMetaData = async (mt) =>
  new Promise(async (resolve, reject) => {
    // upload image to IPFS

    try {
      let pinataImageResponse, pinataAudioResponse, pinataVideoResponse;

      showNotification("Waiting", "Uploading Attachment Files...", "waiting");

      if (mt.file.image) {
        pinataImageResponse = await pinFileToIPFS(mt.file.image);
        if (!pinataImageResponse.success) {
          showNotification("Failed", "Uploading Image Failed", "failed", 3);
          return reject();
        }
      }
      if (mt.file.audio) {
        pinataAudioResponse = await pinFileToIPFS(mt.file.audio);
        if (!pinataAudioResponse.success) {
          showNotification("Failed", "Uploading Audio Failed", "failed", 3);
          return reject();
        }
      }
      if (mt.file.video) {
        pinataVideoResponse = await pinFileToIPFS(mt.file.video);
        if (!pinataVideoResponse.success) {
          showNotification("Failed", "Uploading Video Failed", "failed", 3);
          return reject();
        }
      }

      showNotification("Waiting", "Uploading Metadata...", "waiting");

      // make metadata
      let metadata = {
        name: mt.Name,
        description: mt.Description,
        image: pinataImageResponse?.pinataUrl || mt.ImageUrl,
        animation_url:
          pinataVideoResponse?.pinataUrl ||
          pinataAudioResponse?.pinataUrl ||
          mt.AnimationUrl ||
          null,
        external_url: mt.ExternalLink,
        attributes: mt.Traits,
      };

      const attributes = mt.Traits?.filter(
        (item) => item.display_type && item.value
      ).map((item) => {
        if (item.display_type === "text") {
          delete item.display_type;
        } else if (item.display_type === "number") {
          item.value = Number(item.value);
        }
        return item;
      });

      metadata.attributes = attributes;
      //make pinata call
      const pinataResponse = await pinJSONToIPFS(metadata);
      if (!pinataResponse.success) {
        showNotification("Failed", "Uploading Metadata Failed", "failed", 2000);
        return reject();
      }
      const tokenURI = pinataResponse.pinataUrl;

      return resolve({
        image_uri: pinataImageResponse?.pinataUrl,
        metadata_uri: tokenURI,
      });
    } catch {
      return reject();
    }
  });

const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
        pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl: pinata_gateway_url + response.data.IpfsHash,
      };
    })
    .catch(function (error) {
      return { success: false, message: error.message };
    });
};

const pinFileToIPFS = async (file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  // prepare form data
  let data = new FormData();

  data.append("file", file);

  //pinataOptions are optional
  const pinataOptions = JSON.stringify({
    cidVersion: 0,
    customPinPolicy: {
      regions: [
        {
          id: "FRA1",
          desiredReplicationCount: 1,
        },
        {
          id: "NYC1",
          desiredReplicationCount: 2,
        },
      ],
    },
  });

  data.append("pinataOptions", pinataOptions);

  return axios
    .post(url, data, {
      maxBodyLength: "Infinity", //this is needed to prevent axios from erroring out with large files
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
        pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET,
      },
    })
    .then(function (response) {
      //handle response here
      return {
        success: true,
        pinataUrl: pinata_gateway_url + response.data.IpfsHash,
      };
    })
    .catch(function (error) {
      //handle error here
      return {
        success: false,
        status: "Something went wrong: " + error.message,
      };
    });
};
