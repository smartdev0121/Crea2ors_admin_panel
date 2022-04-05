import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLoading } from 'src/slices/loadingSlice'

import { apiGetCollectionInfo } from 'src/utils/api'
import { updateCollection } from 'src/utils/contract'


const EditCollectionPage = () => {
  const dispatch = useDispatch()
  const { chainId, address } = useParams()

  const [collection, setCollection] = useState({})
  const [file, setFile] = useState()

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
    setCollection((prev) => ({ ...prev, [key]: e.target.value }))
  }

  const handleFileChange = (e) => {
    uploader(e)
    setFile(e.target.files[0])
  }

  const handleUpdateCollection = async () => {
    dispatch(setLoading(true))
    try {
      await updateCollection(
        collection.ContractType,
        collection.ContractAddress,
        collection.ChainId,
        {
          file: file,
          ...collection,
        }
      )
      dispatch(setLoading(false))
    } catch {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    ;(async () => {
      dispatch(setLoading(true))
      try {
        const res = await apiGetCollectionInfo(address, chainId)
        setCollection(res)
        dispatch(setLoading(false))
      } catch {
        dispatch(setLoading(false))
      }
    })()
  }, [address, dispatch, chainId])

  const { result, uploader } = useDisplayImage()

  return (
    <div className='edit-collection-card'>
      <section>
        <h4>Edit {collection.CollectionName}</h4>
        <input
          placeholder='Collection Name'
          value={collection.CollectionName}
          onChange={(e) => handleInputChange(e, 'CollectionName')}
        />
        <input
          placeholder='Collection Ticker'
          value={collection.CollectionTicker}
          onChange={(e) => handleInputChange(e, 'CollectionTicker')}
        />

        <input
          placeholder='Royalty percentage'
          value={collection.RoyaltyFee}
          onChange={(e) => handleInputChange(e, 'RoyaltyFee')}
        />

        <input
          placeholder='Royalty wallet address'
          value={collection.RoyaltyAddress}
          onChange={(e) => handleInputChange(e, 'RoyaltyAddress')}
        />

        <textarea
          placeholder='Description'
          value={collection.Description}
          onChange={(e) => handleInputChange(e, 'Description')}
        />

        <label>Choose Image:</label>
        <input
          type='file'
          id='image-file'
          accept='.jpg, .png, .jpeg, .bmp'
          // defaultValue={collection.ImageUrl}
          onChange={(e) => handleFileChange(e)}
        />

        <input
          placeholder='External URL'
          value={collection.ExternalUrl}
          onChange={(e) => handleInputChange(e, 'ExternalUrl')}
        />

        <button onClick={handleUpdateCollection}>Update a collection</button>
      </section>

      <section>
        <img
          src={result || collection.ImageUrl || '/images/img_error.png'}
          style={{ width: 300, height: 'auto' }}
          alt='collection'
        />

        <h5>{collection.CollectionName}</h5>
        <span>{collection.CollectionTicker}</span>
        <span>{collection.Description}</span>

      </section>
    </div>
  )
}

export default EditCollectionPage
