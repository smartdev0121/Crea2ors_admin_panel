import React, { useState } from 'react'

import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import styles from './MAccordion.module.scss'

const MAccordion = (props) => {
  const { title, children } = props

  const [opened, setOpened] = useState(false)

  const handleChange = () => {
    setOpened(!opened)
  }

  return (
    <Accordion expanded={opened} onChange={handleChange} className={styles.accordionItem}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ width: '33%', flexShrink: 0 }}>{title}</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Typography>{children}</Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default MAccordion
