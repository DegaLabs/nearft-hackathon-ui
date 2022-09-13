import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Banner from '../components/Banner'
import { IPool } from '../interfaces'

import creatorImg from '../assets/creator1.png'
import { Container, Row, Col } from 'react-bootstrap'
import nftPlaceholder from '../assets/nft1.png'
import { trimName } from '../utils/utils'
import { nearTo } from '../utils/amount'

interface PoolDetailProps {
  collections: Array<IPool>
}

const PoolDetail = (props: PoolDetailProps): JSX.Element => {
  const { collections } = props

  const [collection, setCollection] = useState<IPool | undefined>()
  const [nfts, setNFTs] = useState<any>()
  const [tokenIds, setTokenIds] = useState<string[]>()
  const [isLoading, setLoading] = useState<boolean>(true)
  const params = useParams()

  console.log('collection', collection)

  useEffect(() => {
    if (collections && params) {
      const _collection = collections.filter((collection) => collection.pool_id === Number(params.id))
      setCollection(_collection[0])
      setTokenIds(_collection[0].pool_token_ids)
      setNFTs(_collection[0].poolTokenMetadata)
    }
    setLoading(false)
  }, [params, collections])

  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    )
  }

  return (
    <div className="w-full flex justify-start items-center flex-col min-h-screen mb-20">
      <div className="w-full flexCenter flex-col">
        <Banner
          name={collection?.nft_token}
          childStyles="text-center mb-4 text-white"
          parentStyles="h-80 justify-center"
        />

        <div className="flexCenter flex-col -mt-20 z-0">
          <div className="flexCenter w-40 h-40 sm:w-36 sm:h-36 p-1 bg-nft-black-2 rounded-full">
            <img src={creatorImg} className="rounded-full object-cover" alt="" />
          </div>
          <a
            className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-6"
            href={`https://explorer.testnet.near.org/accounts/${collection?.nft_token}`}
            target="_blank"
          >
            {collection?.nft_token}
          </a>
        </div>
      </div>

      {!isLoading && !tokenIds?.length && nfts === undefined ? (
        <div className="flexCenter sm:p-4 p-16">
          <h1
            className="font-poppins dark:text-white text-nft-black-1
            font-extrabold text-3xl"
          >
            No NFTs Owned
          </h1>
        </div>
      ) : (
        <Container>
          <Row>
            {tokenIds?.map((token, i) => (
              <Col sm={6} lg={4} xl={3} key={i}>
                <div className="dark:bg-nft-black-3 bg-white rounded-2xl p-4 sm:my-2 shadow-md">
                  <div className="relative w-full rounded-2xl overflow-hidden">
                    <img src={nfts[token].icon ? nfts[token].icon : nftPlaceholder} alt="" />
                  </div>
                  <div className="mt-3 flex flex-col">
                    <div className="flex flex-row align-items-center">
                      <a
                        className="font-poppins text-nft-black-1 text-sm"
                        href={`https://explorer.testnet.near.org/accounts/${nfts[token].contractId}`}
                        target="_blank"
                      >
                        {trimName(nfts[token].contractId, 12, 12, 28)}
                      </a>
                      <img className="ml-2" src={nfts[token].nftIcon} style={{ maxWidth: '20px' }} alt="" />
                    </div>
                    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-md mt-2">
                      <span className="text-nft-gray-2">#{nfts[token].tokenId}</span> {nfts[token].metadata.title}
                    </p>
                    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2">
                      <span className="text-nft-gray-2">
                        {collection?.spot_price ? nearTo(collection?.spot_price) : '--'}{' '}
                      </span>
                      NEAR
                    </p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  )
}

export default PoolDetail
