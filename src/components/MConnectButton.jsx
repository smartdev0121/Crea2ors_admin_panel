import Button from '@mui/material/Button';
import './MConnectButton.scss'

const MConnectButton = () => {
  return (
    <div className='btn-connect'>
      <Button className='btn btn-primary'>Connect Wallet</Button>
      <div className='btn-blur-back' />
    </div>
  )
}

export default MConnectButton