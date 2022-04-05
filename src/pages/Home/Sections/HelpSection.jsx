import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import MConnectButton from 'src/components/MConnectButton'

const wallets = ['metamask', 'trust', 'polygon', 'pay', 'x']

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 992 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 992, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
}

const SupportedWallets = () => {
  return (
    <>
      <MConnectButton />
      <h6>Supported Wallets</h6>
      <div className='supported-wallets'>
        {wallets.map((wallet, index) => (
          <img src={`/images/wallet-icons/${wallet}.svg`} key={index} alt={wallet} />
        ))}
      </div>
    </>
  )
}

const HelpStep1 = () => {
  return (
    <div className='help-step'>
      <img src='/images/home/help/wallet.svg' alt='Wallet'/>
      <div>
        <span>Set up your wallet</span>
        <p>
          Once you’ve set up your wallet of choice, connect it to Pleasurenifty by clicking the
          wallet icon in the top right corner. Learn about the wallets we support.
        </p>
      </div>
    </div>
  )
}

const HelpStep2 = () => {
  return (
    <div className='help-step'>
      <img src='/images/home/help/collection.svg' alt='Create your Collection'/>
      <div>
        <span>Create your collection</span>
        <p>
          Once you’ve set up your wallet of choice, connect it to Pleasurenifty by clicking the
          wallet icon in the top right
        </p>
      </div>
    </div>
  )
}

const HelpStep3 = () => {
  return (
    <div className='help-step'>
      <img src='/images/home/help/nft.svg' alt='Add your NFTs'/>
      <div>
        <span>Add your NFTs</span>
        <p>
          Upload your work (image, video, audio, or 3D art), add a title and description, and
          customize your NFTs with properties, stats, and unlockable content.
        </p>
      </div>
    </div>
  )
}

const HelpStep4 = () => {
  return (
    <div className='help-step'>
      <img src='/images/home/help/list.svg' alt='List for sale'/>
      <div>
        <span>List them for sale</span>
        <p>
          Choose between auctions, fixed-price listings, and declining-price listings. You choose
          how you want to sell your NFTs, and we help you sell them!
        </p>
      </div>
    </div>
  )
}

const HelpSection = () => {
  return (
    <section className='section-help'>
      <div className='container'>
        <h2>
          <strong>Create</strong> and <strong>sell</strong> your Great NFTs
        </h2>
        <div className='help-content'>
          <div className='left-panel'>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam convallis mauris a nibh
              ullamcorper hendrerit. Nulla enim elit, aliquam vitae pellentesque at, imperdiet vitae
              mi. Nulla convallis tellus in interdum molestie. Phasellus lobortis sodales ante vitae
              elementum. In hac habitasse platea dictumst. Aliquam consectetur metus a consectetur
              eleifend. Donec eget aliquet purus, egestas molestie dui. Nullam quis nisi nec mi
              gravida suscipit ut vel sapien.
            </p>
            <SupportedWallets />
          </div>

          <div className='right-panel'>
            <div className='desktop-help'>
              <HelpStep1 />
              <HelpStep2 />
              <HelpStep3 />
              <HelpStep4 />
            </div>
            <Carousel
              swipeable={false}
              infinite={true}
              draggable={false}
              responsive={responsive}
              showDots={true}
              arrows={false}
              dotListClass='carousel-custom-dot-list'
              itemClass='carousel-item'
            >
              <HelpStep1 />
              <HelpStep2 />
              <HelpStep3 />
              <HelpStep4 />
            </Carousel>

            <SupportedWallets />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HelpSection
