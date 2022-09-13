import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Banner from '../components/Banner'
import { IPool } from '../interfaces'

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
  const { id } = useParams()

  useEffect(() => {
    if (collections && id) {
      const _collection = collections.filter((collection) => collection.pool_id === Number(id))
      setCollection(_collection[0])
      setTokenIds(_collection[0].pool_token_ids)
      setNFTs(_collection[0].poolTokenMetadata)
    }
    setLoading(false)
  }, [id, collections])

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
          childStyles="text-center mb-4 text-white"
          parentStyles="h-80 justify-center"
        />

        <div className="flexCenter flex-col -mt-48 z-0">
          <a
            className="font-poppins text-white hover:text-white font-semibold text-2xl mt-6"
            href={`https://explorer.testnet.near.org/accounts/${collection?.nft_token}`}
            target="_blank"
            rel="noreferrer"
          >
            {trimName(collection?.nft_token, 10, 12, 30)}
          </a>
        </div>
      </div>

      {!tokenIds?.length && nfts === undefined ? (
        <div className="flexCenter sm:p-4 p-16">
          <h1
            className="font-poppins dark:text-white text-nft-black-1
            font-extrabold text-3xl"
          >
            No NFTs Owned
          </h1>
        </div>
      ) : (
        <Container className="mt-44">
          <Row>
            {tokenIds?.map((token, i) => (
              <Col sm={6} lg={4} xl={3} key={i} className="mb-4">
                <Link to={`/collection/${id}/${token}`}>
                  <div className="dark:bg-nft-black-3 bg-white rounded-2xl p-4 sm:my-2 shadow-md">
                    <div className="relative w-full rounded-2xl overflow-hidden">
                      <img src={nfts[token]?.icon ? nfts[token]?.icon : nftPlaceholder} alt="" />
                    </div>
                    <div className="mt-3 flex flex-col">
                      <div className="flex flex-row align-items-center">
                        <a
                          className="font-poppins text-nft-black-1 text-sm"
                          href={`https://explorer.testnet.near.org/accounts/${nfts[token]?.contractId}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {trimName(nfts[token]?.contractId, 12, 10, 24)}
                        </a>
                        <img
                          className="ml-2"
                          src={nfts[token]?.nftIcon ? nfts[token]?.nftIcon : nftPlaceholder}
                          style={{ maxWidth: '20px' }}
                          alt=""
                        />
                      </div>
                      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-md mt-2">
                        <span className="text-nft-gray-2">#{nfts[token]?.tokenId}</span>{' '}
                        {nfts[token]?.metadata.title ? trimName(nfts[token]?.metadata.title, 12, 10, 25) : 'No name'}
                      </p>
                      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2">
                        <span className="text-nft-gray-2">
                          {collection?.spot_price ? nearTo(collection?.spot_price) : '--'}{' '}
                        </span>
                        NEAR
                      </p>
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  )
}

export default PoolDetail
