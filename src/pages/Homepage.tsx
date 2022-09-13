import Banner from '../components/Banner'
import NFTCard from '../components/NFTCard'
import { Container, Row } from 'react-bootstrap'
import { IPool } from '../interfaces'
interface IDetailNFTProps {
  collections: Array<IPool> | undefined
}
const Homepage: React.FC<IDetailNFTProps> = ({ collections }) => {
  return (
    <div className="flex justify-center sm:px-4 p-12">
      <Container>
        <Banner
          parentStyles="justify-start mb-6 h-72 sm:h-96 p-12 xs:p-4 xs:h-44 rounded-3xl"
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left text-white leading-loose"
          name={
            <>
              The First AMM NFT Marketplace <br /> On Near Blockchain
            </>
          }
        />
        {/* <div className="mt-10">
          <h2 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4 flex-1">
            Hot NFTs
          </h2>
          <Row>
            {collections?.map((c) =>
              c.pool_token_ids.map((e) => (
                <NFTCard
                  key={`nft-${c.pool_id}-${e}`}
                  nft={{
                    i: i,
                    name: `Nifty NFT ${i}`,
                    price: 10 - i * 0.5,
                    seller: 'duongpadev.testnet',
                    owner: 'duongpadev.testnet',
                    description: 'Cool NFT on Sale',
                  }}
                />
              )),
            )}
          </Row>
        </div> */}
      </Container>
    </div>
  )
}

export default Homepage
