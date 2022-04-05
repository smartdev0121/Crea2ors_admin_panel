import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { setLoading } from 'src/slices/loadingSlice'

import { apiGetAsset } from 'src/utils/api'
import { updateAsset } from 'src/utils/contract'
import { CONTRACT_TYPE } from 'src/config/global'

const EditAssetPage = () => {
  const dispatch = useDispatch()

  const [file, setFile] = useState({})
  const [metadata, setMetadata] = useState({
    Traits: [{ trait_type: '', value: '', display_type: 'text' }],
  })

  const { chainId, address, tokenId } = useParams()

  const useDisplayImage = () => {
    const [result, setResult] = React.useState('')

    const uploader = (e) => {
      const imageFile = e.target.files[0]

      const reader = new FileReader()
      reader.addEventListener('load', (e) => {
        setResult(e.target.result)
      })

      reader.readAsDataURL(imageFile)
    }

    return { result, uploader }
  }

  const handleInputChange = (e, key) => {
    setMetadata((prevMetadata) => ({ ...prevMetadata, [key]: e.target.value }))
  }

  const handleAttributesChange = (e, index, key) => {
    const tempAttributes = metadata.Traits?.map((item) => item)

    tempAttributes[index][key] = e.target.value

    setMetadata((prevMetadata) => ({
      ...prevMetadata,
      Traits: tempAttributes,
    }))
  }

  const handleAddAttributes = () => {
    const tempAttributes = metadata.Traits?.map((item) => item)
    tempAttributes.push({ trait_type: '', value: '', display_type: 'text' })

    setMetadata((prevMetadata) => ({
      ...prevMetadata,
      Traits: tempAttributes,
    }))
  }

  const handleRemoveAttribute = (index) => {
    const tempAttributes = metadata.Traits?.map((item) => item)
    tempAttributes.splice(index, 1)

    setMetadata((prevMetadata) => ({
      ...prevMetadata,
      Traits: tempAttributes,
    }))
  }

  const handleFileChange = (e, type) => {
    uploader(e)
    setFile((prevFile) => ({ ...prevFile, [type]: e.target.files[0] }))
  }

  const handleUpdate = async () => {
    dispatch(setLoading(true))

    await updateAsset(
      metadata.Collection.ContractType,
      address,
      metadata.Collection.ChainId,
      tokenId,
      {
        file: file,
        ...metadata,
      }
    )

    dispatch(setLoading(false))
    setLoading(false)
  }

  useEffect(() => {
    ;(async () => {
      dispatch(setLoading(true))
      try {
        const assetData = await apiGetAsset(address, chainId, tokenId)
        assetData.Traits = JSON.parse(assetData.Traits)
        setMetadata(assetData)
        dispatch(setLoading(false))
      } catch {
        dispatch(setLoading(false))
      }
    })()
  }, []) //eslint-disable-line

  const { result, uploader } = useDisplayImage()

  return (
    <div className='edit-asset-card'>
      <section>
        <h4>
          Edit{' '}
          {metadata.Collection?.ContractType === CONTRACT_TYPE.ERC721
            ? 'ERC 721'
            : 'ERC 1155'}{' '}
          NFT on {metadata.Collection?.CollectionName}
        </h4>

        <input
          placeholder='Title'
          value={metadata.Name}
          onChange={(e) => handleInputChange(e, 'Name')}
        />
        <textarea
          placeholder='Description'
          value={metadata.Description}
          onChange={(e) => handleInputChange(e, 'Description')}
        />

        <label>Choose Image:</label>
        <input
          type='file'
          id='image-file'
          accept='.jpg, .png, .jpeg, .bmp'
          onChange={(e) => handleFileChange(e, 'image')}
        />

        <label>Choose Audio:</label>
        <input
          type='file'
          id='audio-file'
          accept='.mp3, .wav'
          onChange={(e) => handleFileChange(e, 'audio')}
        />

        <label>Choose Video</label>
        <input
          type='file'
          id='video-file'
          accept='.avi, .mp4, .mpeg, .mpg'
          onChange={(e) => handleFileChange(e, 'video')}
        />

        <input
          placeholder='External URL'
          value={metadata.ExternalLink}
          onChange={(e) => handleInputChange(e, 'ExternalLink')}
        />

        <h5>Traits</h5>

        {metadata.Traits?.map((item, index) => (
          <div className='input-group' key={`trait_group${index}`}>
            <input
              placeholder='key'
              style={{ width: '25%' }}
              value={item.trait_type}
              onChange={(e) => handleAttributesChange(e, index, 'trait_type')}
            />

            <input
              placeholder='Value'
              style={{ width: '25%' }}
              value={item.value}
              onChange={(e) => handleAttributesChange(e, index, 'value')}
            />

            <select
              defaultValue='text'
              value={item.display_type || 'text'}
              style={{ width: 'calc(50% - 50px)' }}
              onChange={(e) => handleAttributesChange(e, index, 'display_type')}
            >
              <option value='text'>Text</option>
              <option value='number'>Number</option>
              <option value='date'>Date</option>
            </select>

            <button
              type='default'
              style={{ width: '50px', height: '33px' }}
              onClick={() => handleRemoveAttribute(index)}
            >
              -
            </button>
          </div>
        ))}

        <button type='default' onClick={handleAddAttributes}>
          Add Traits
        </button>
      </section>

      <section>
        <h4>
          Preview of your{' '}
          {metadata.Collection?.ContractType === CONTRACT_TYPE.ERC721
            ? 'ERC 721'
            : 'ERC 1155'}
          :
        </h4>

        <img
          src={result || metadata.ImageUrl || '/images/img_error.png'}
          style={{ width: 300, height: 'auto' }}
          alt='collection'
        />

        <h5>{metadata.name || 'Title'} </h5>

        <span>{metadata.Description || 'Description'}</span>
        <span>{metadata.ExternalLink || 'External URL'}</span>
        {metadata.Traits?.map((item, index) => (
          <span key={`trait_display${index}`}>
            {item.trait_type || 'Trait Type'} | {item.value || 'Trait Value'} |{' '}
            {item.display_type || 'Display Type'}
          </span>
        ))}
        <button type='primary' onClick={handleUpdate}>
          Update
        </button>
      </section>
    </div>
  )
}

export default EditAssetPage
