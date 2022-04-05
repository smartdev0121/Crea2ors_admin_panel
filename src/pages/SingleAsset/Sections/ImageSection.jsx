const ImageSection = (props) => {

  const {ImageUrl} = props

  return (
    <section className='section-image'>
      <section className='item-image-wrapper'>
        <img src={ImageUrl || '/images/img_error.png'} alt='nft-item' />
      </section>
    </section>
  )
}

export default ImageSection
