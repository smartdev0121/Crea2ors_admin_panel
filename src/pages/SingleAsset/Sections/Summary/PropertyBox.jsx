import MTraitItem from 'src/components/MTraitItem'

const PropertyBox = (props) => {
  const { nft } = props

  return (
    <div className='trait-list'>
      {nft.Traits &&
        JSON.parse(nft.Traits)?.map((trait, ind) => {
          return (
            <MTraitItem
              key={`trait-item${ind}`}
              type={trait.trait_type}
              value={trait.value}
              rarity={nft.Rarity[ind]}
            />
          )
        })}
    </div>
  )
}

export default PropertyBox
