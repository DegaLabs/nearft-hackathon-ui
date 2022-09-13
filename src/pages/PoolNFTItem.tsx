import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../components/Button'
import nftPlaceholder from '../assets/nft1.png'
import Loader from '../components/Loader'
import { IAccount, IPool } from '../interfaces'
import { Col, Container, Row } from 'react-bootstrap'
import { trimName } from '../utils/utils'

interface IPoolNFTItemProps {
  collections: Array<IPool> | undefined
  account: IAccount | null
}

const PoolNFTItem: React.FC<IPoolNFTItemProps> = ({ collections, account }) => {
  const [nft, setNFT] = useState<any>()
  const [isLoading, setLoading] = useState<boolean>(true)

  const { id, detail } = useParams()

  useEffect(() => {
    if (collections && id && detail) {
      const _collection = collections.filter((collection) => collection.pool_id === Number(id))
      const _NFTs = _collection[0].poolTokenMetadata
      // @ts-ignore
      setNFT(_NFTs[detail])
    }
    setLoading(false)
  }, [detail, id, collections])

  if (isLoading) return <Loader />

  return (
    <div className="max-w-5xl m-auto">
      <Container>
        <Row className="mt-10 lg:mt-20 mb-10 lg:mb-20">
          <Col sm={5} lg={6}>
            <div className="text-center mb-5">
              <img
                src={nft?.icon ? nft?.icon : nftPlaceholder}
                className="rounded-xl shadow-lg"
                alt={nft?.metadata.title}
              />
            </div>
          </Col>
          <Col sm={5} lg={6}>
            <h2 className="mt-2 font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl minlg:text-3xl">
              #{nft?.tokenId}
            </h2>
            <h2 className="mt-2 font-poppins dark:text-white text-nft-gray-3 font-semibold text-xl minlg:text-2xl">
              {nft?.metadata.title ? nft?.metadata.title : 'No name'}
            </h2>
            <div className="mt-2">
              <p className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-base font-semibold">
                Owner:{' '}
                <a
                  className="font-poppins text-nft-black-1 text-sm"
                  href={`https://explorer.testnet.near.org/accounts/${nft?.ownerId}`}
                  target="_blank"
                >
                  {trimName(nft?.ownerId, 12, 12, 28)}
                </a>
                {}
              </p>

              {nft?.metadata.description && (
                <div className="mt-3 flex flex-col">
                  <div className="w-full border-b dark:border-nft-black-1 border-nft-gray-1 flex flex-row">
                    <p className="font-poppins dark:text-white text-nft-black-1 text-base minlg:text-base font-medium mb-2">
                      Details
                    </p>
                  </div>
                  <div className="mt-3">
                    <p className="font-poppins dark:text-white text-nft-black-1 text-base font-normal">
                      {nft?.metadata.description}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-row sm:flex-col mt-10">
                {account?.account_id === nft?.seller?.toLowerCase() ? (
                  <p className="font-poppins dark:text-white text-nft-black-1 text-base font-normal border border-gray p-2">
                    You cannot buy your own NFT.
                  </p>
                ) : account?.account_id === nft?.owner?.toLowerCase() ? (
                  <Button
                    btnName="List on Marketplace"
                    classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
                    handleClick={() => console.log('List on Marketplace')}
                  />
                ) : (
                  <Button
                    btnName={`Buy for #${nft?.tokenId}`}
                    classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
                    handleClick={() => console.log('Buy')}
                  />
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default PoolNFTItem
