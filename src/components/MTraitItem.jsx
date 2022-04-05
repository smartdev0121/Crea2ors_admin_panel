import styles from './MTraitItem.module.scss'

const MTraitItem = ({ type, value, rarity }) => {
  return (
    <div className={styles.traitItem}>
      <span className='type'>{type}</span>
      <span className='value'>{value}</span>
      <span className='rarity'>{rarity}% have this trait</span>
    </div>
  )
}

export default MTraitItem
