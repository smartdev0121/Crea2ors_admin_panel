import React, { useState } from 'react'
import { Radio } from 'antd'
import { useDispatch } from 'react-redux'

import { setLoading } from 'src/slices/loadingSlice'
import { CONTRACT_TYPE } from 'src/config/global'
import { deployContract } from 'src/utils/contract'

const CreateCollectionPage = () => {
  const dispatch = useDispatch()

  const [contractType, setContractType] = useState(0)
  const [file, setFile] = useState()
  const [metadata, setMetadata] = useState({})

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
    setMetadata((prev) => ({ ...prev, [key]: e.target.value }))
  }

  const handleFileChange = (e) => {
    uploader(e)
    setFile(e.target.files[0])
  }

  const handleCreateCollection = async () => {
    dispatch(setLoading(true))
    try {
      await deployContract(contractType, { ...metadata, file: file })
      dispatch(setLoading(false))
    } catch {
      dispatch(setLoading(false))
    }
  }

  const { result, uploader } = useDisplayImage()

  return (
    <div className='create-collection-card'>
      <section>
        <h4 level={4}>Create a New NFT Collection</h4>

        <Radio.Group
          onChange={(e) => setContractType(e.target.value)}
          value={contractType}
        >
          <Radio value={CONTRACT_TYPE.ERC721}>ERC721</Radio>
          <Radio value={CONTRACT_TYPE.ERC1155}>ERC1155</Radio>
        </Radio.Group>

        <input
          placeholder='Collection Name'
          onChange={(e) => handleInputChange(e, 'CollectionName')}
        />
        <input
          placeholder='Collection Ticker'
          onChange={(e) => handleInputChange(e, 'CollectionTicker')}
        />

        <input
          placeholder='Royalty percentage'
          onChange={(e) => handleInputChange(e, 'RoyaltyFee')}
        />

        <input
          placeholder='Royalty wallet address'
          onChange={(e) => handleInputChange(e, 'RoyaltyAddress')}
        />

        <textarea
          placeholder='Description'
          onChange={(e) => handleInputChange(e, 'Description')}
        />

        <label>Choose Image:</label>
        {/* <FileUploader multiple={true} handleChange={handleFileChange} name='file' types={fileTypes} /> */}
        <input
          type='file'
          id='image-file'
          accept='.jpg, .png, .jpeg, .bmp'
          onChange={(e) => handleFileChange(e)}
        />

        <input
          placeholder='External URL'
          onChange={(e) => handleInputChange(e, 'ExternalUrl')}
        />

        <button onClick={handleCreateCollection}>Create a collection</button>
      </section>
      <section>
        <img
          src={result || metadata.ImageUrl || '/images/img_error.png'}
          style={{ width: 300, height: 'auto' }}
          alt='collection'
        />

        <h5>{metadata.CollectionName}</h5>
        <span>{metadata.CollectionTicker}</span>
        <span>{metadata.Description}</span>
      </section>
    </div>
  )
}

export default CreateCollectionPage
