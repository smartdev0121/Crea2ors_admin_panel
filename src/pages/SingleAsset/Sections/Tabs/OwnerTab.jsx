import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

const OwnerTab = (props) => {
  const { owners } = props

  return (
    <List sx={{ width: '100%', bgcolor: 'none' }}>
      {owners?.map((owner) => {
        return (
          <ListItem alignItems='flex-start'>
            <ListItemAvatar>
              <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
            </ListItemAvatar>
            <ListItemText
              primary='Current Owner'
              secondary={
                <React.Fragment>
                  <Typography sx={{ display: 'inline' }} component='span' variant='body2'>
                    {owner.Wallet}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        )
      })}
    </List>
  )
}

export default OwnerTab
