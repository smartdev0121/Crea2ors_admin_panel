import React, { useState } from 'react'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import InfoSection from './InfoSection'
import OwnerTab from './Tabs/OwnerTab'
import ItemActivityTab from './Tabs/ItemActivityTab'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const MainSection = (props) => {
  const { nft, walletAddress } = props
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <section className='section-main'>
      <div className='header'>
        <label>{nft.Collection?.CollectionName}</label>
        <h2>{nft.Name}</h2>
        <InfoSection nft={nft} walletAddress={walletAddress} />
      </div>

      <div className='description'>{nft.Description}</div>

      <div className='content'>
        <Button className='btn btn-primary'>Make offer</Button>

        <Tabs value={value} onChange={handleChange} className='main-tab'>
          <Tab label='Owners' {...a11yProps(0)} />
          <Tab label='Bids' {...a11yProps(1)} />
          <Tab label='Details' {...a11yProps(2)} />
          <Tab label='History' {...a11yProps(3)} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <OwnerTab owners={nft.Owners} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ItemActivityTab transactions={nft.TransactionHistory} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ItemActivityTab transactions={nft.TransactionHistory} />
        </TabPanel>
      </div>
    </section>
  )
}

export default MainSection
