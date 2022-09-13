import Banner from '../components/Banner'
import NFTCard from '../components/NFTCard'
import {Container, Row} from 'react-bootstrap'

const Homepage = () => {
  return (
    <div className="flex justify-center sm:px-4 p-12">
      <Container>
        <div className="mt-10">
          <h2 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4 flex-1">
            Hot NFTs
          </h2>
          <Row>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <NFTCard
                key={`nft-${i}`}
                nft={{
                  i: i,
                  name: `Nifty NFT ${i}`,
                  price: 10 - i * 0.5,
                  seller: 'duongpadev.testnet',
                  owner: 'duongpadev.testnet',
                  description: 'Cool NFT on Sale',
                }}
              />
            ))}
          </Row>
        </div>
      </Container>
    </div>
  )
}

export default Homepage
