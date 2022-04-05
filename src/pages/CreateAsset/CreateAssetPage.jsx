import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLoading } from 'src/slices/loadingSlice'

import { CONTRACT_TYPE } from 'src/config/global'
import { mintAsset } from 'src/utils/contract'
import { apiGetCollectionInfo } from 'src/utils/api'

const CreateAssetPage = () => {
  const dispatch = useDispatch()

  const { chainId, address } = useParams()

  const [collection, setCollection] = useState({})
  const [file, setFile] = useState({})
  const [metadata, setMetadata] = useState({
    Traits: [{ trait_type: '', value: '', display_type: 'text' }],
  })

  const [supply, setSupply] = useState(0)
  const [maximumSupply, setMaximumSupply] = useState(0)

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

  const handleCreateNFT = async () => {
    dispatch(setLoading(true))

    try {
      await mintAsset(
        collection.ContractType,
        collection.ContractAddress,
        collection.ChainId,
        { ...metadata, file: file },
        supply,
        maximumSupply
      )
      dispatch(setLoading(false))
    } catch {
      dispatch(setLoading(false))
    }
    // const address = '0xEBeFf4e566a0B50dD512ffD915686926b2Ca8Aa0'
  }

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

  useEffect(() => {
    ;(async () => {
      dispatch(setLoading(true))

      try {
        const collectionData = await apiGetCollectionInfo(address, chainId)
        setCollection(collectionData)
        dispatch(setLoading(false))
      } catch {
        dispatch(setLoading(false))
      }
    })()
  }, []) //eslint-disable-line

  const { result, uploader } = useDisplayImage()

  return (
    <div className='create-asset-card'>
      <section className='asset-info'>
        <h4>
          Add a New{' '}
          {collection.ContractType === CONTRACT_TYPE.ERC721
            ? 'ERC 721'
            : 'ERC 1155'}{' '}
          NFT to {collection.CollectionName}
        </h4>

        {collection.ContractType === CONTRACT_TYPE.ERC1155 && (
          <>
            <input
              placeholder='Supply'
              onChange={(e) => setSupply(e.target.value)}
            />
            <input
              placeholder='Maximum Supply'
              onChange={(e) => setMaximumSupply(e.target.value)}
            />
          </>
        )}

        <input
          placeholder='Title'
          onChange={(e) => handleInputChange(e, 'Name')}
        />
        <textarea
          placeholder='Description'
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
          onChange={(e) => handleInputChange(e, 'ExternalLink')}
        />

        <h5 level={5}>Traits</h5>

        {metadata.Traits?.map((item, index) => (
          <div className='input-group' key={`trait_group${index}`}>
            <input
              placeholder='key'
              style={{ width: '25%' }}
              onChange={(e) => handleAttributesChange(e, index, 'trait_type')}
            />

            <input
              placeholder='Value'
              style={{ width: '33%' }}
              onChange={(e) => handleAttributesChange(e, index, 'value')}
            />

            <select
              defaultValue='text'
              style={{ width: '30%' }}
              onChange={(e) => handleAttributesChange(e, index, 'display_type')}
            >
              <option value='text'>Text</option>
              <option value='number'>Number</option>
              <option value='date'>Date</option>
            </select>

            <button
              style={{ width: '12%' }}
              onClick={() => handleRemoveAttribute(index)}
            >
              -
            </button>
          </div>
        ))}

        <button onClick={handleAddAttributes}>Add Traits</button>
      </section>

      <section className='asset-preview'>
        <h4>
          Preview of your{' '}
          {collection.ContractType === CONTRACT_TYPE.ERC721
            ? 'ERC 721'
            : 'ERC 1155'}
          :
        </h4>

        <img
          src={result || '/images/img_error.png'}
          style={{ width: 300, height: 'auto' }}
          alt='asset'
        />

        <h5 level={5}>{metadata.Name || 'Title'}</h5>

        <span>{metadata.Description || 'Description'}</span>
        <span>{metadata.ExternalLink || 'External URL'}</span>

        {metadata.Traits?.map((item, index) => (
          <span key={`traits${index}`}>
            {item.trait_type || 'Trait Type'} | {item.value || 'Trait Value'} |{' '}
            {item.display_type || 'Display Type'}
          </span>
        ))}

        <button type='primary' onClick={handleCreateNFT}>
          Create an NFT
        </button>
      </section>
    </div>
  )
}

export default CreateAssetPage
