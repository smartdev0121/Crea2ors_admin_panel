import React from 'react'
import Button from '@mui/material/Button'
import styles from './MCollectionItem.module.scss'

const MCollectionItem = ({ collection }) => {
  return (
    <div className={styles.collectionItem}>
      <div className='header'>
        <div className='title'>
          <span className='name'>{collection.CollectionName || '<Unnamed>'}</span>
          <span className='creator'>{collection.Wallet}</span>
        </div>
        <Button className='btn btn-primary'>Follow</Button>
      </div>
      <div className='content'>
        <div className='img-wrapper'>
          <img src={collection.ImageUrl || '/images/img_error.png'} alt='collection-img' />
        </div>
        <div className='img-wrapper'>
          <img src={collection.ImageUrl || '/images/img_error.png'} alt='collection-img' />
        </div>
        <div className='img-wrapper'>
          <img src={collection.ImageUrl || '/images/img_error.png'} alt='collection-img' />
        </div>
      </div>

      <div className='footer'>
        <h5>Description</h5>
        <p>{collection.Description}</p>
      </div>
    </div>
  )
}

export default MCollectionItem
