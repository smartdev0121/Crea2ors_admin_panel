import React from 'react'

import MAccordion from 'src/components/MAccordion'

import PropertyBox from './Summary/PropertyBox'
import DetailsBox from './Summary/DetailsBox'

const SummarySection = (props) => {
  const { nft } = props

  return (
    <section className='section-summary'>
      <MAccordion title='Description'>{nft.Description || '#No Description'}</MAccordion>

      <MAccordion title='Properties'>
        <PropertyBox nft={nft} />
      </MAccordion>

      <MAccordion title='About this Collection'>{nft.Collection?.Description}</MAccordion>

      <MAccordion title='Details'>
        <DetailsBox nft={nft} />
      </MAccordion>
    </section>
  )
}

export default SummarySection
