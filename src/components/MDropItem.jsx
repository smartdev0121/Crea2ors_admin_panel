import React from 'react'

import styles from './MDropItem.module.scss'

const MDropItem = ({ drop }) => {
  return (
    <div className={styles.dropItem}>
      <img draggable='false' src={drop?.ImageUrl || '/images/img_error.png'} alt='Drop Item'/>
      <div className='drop-detail'>
        <h4>{drop?.CollectionName}</h4>
        <span>{drop?.Description}</span>
      </div>
    </div>
  )
}

export default MDropItem
