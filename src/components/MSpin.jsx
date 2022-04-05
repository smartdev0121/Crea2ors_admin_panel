import ScaleLoader from 'react-spinners/ScaleLoader'
import styles from './MSpin.module.scss'

const color = 'rgb(56, 75, 242)'

const MSpin = (props) => {
  const { spinning } = props

  return (
    <div className={`${styles.spin} ${spinning ? 'loading' : ''}`}>
      <ScaleLoader color={color} loading={spinning} size={50}></ScaleLoader>
    </div>
  )
}

export default MSpin
