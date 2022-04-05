import React, { useState, useEffect } from 'react'
import './MModal.css'

const MModal = (props) => {
  const { onOk, onCancel } = props

  const [visible, setVisible] = useState(false)

  const handleOk = () => {
    onOk()
  }

  const handleCancel = () => {
    onCancel()
  }

  useEffect(() => {
    setVisible(props.visible)
  }, [props])

  return (
    <>
      {visible && (
        <>
          <div className='m-modal-wrapper'>
            <div className='m-modal-header'>{props.title}</div>
            <div className='m-modal-content'>{props.children}</div>
            <div className='m-modal-footer'>
              <button onClick={handleOk}>OK</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>

          <div className='m-modal-background' />
        </>
      )}
    </>
  )
}

export default MModal
