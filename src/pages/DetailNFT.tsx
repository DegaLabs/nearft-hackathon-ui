import React, { useState } from 'react'
import Button from '../components/Button'
import nftPlaceholder from '../assets/nft1.png'
import Loader from '../components/Loader'
import { IAccount, INFTMetadata } from '../interfaces'
import { Col, Container, Row } from 'react-bootstrap'

interface IDetailNFTProps {
  account: IAccount | null
  nft: INFTMetadata
  isLoading: boolean
}

const DetailNFT: React.FC<IDetailNFTProps> = ({ account, nft, isLoading }) => {
  if (isLoading) return <Loader />

  return (
    <div className="max-w-5xl m-auto">
      <Container>
        <Row className="mt-10 lg:mt-20 mb-10 lg:mb-20">
          <Col sm={5} lg={6}>
            <div className="text-center mb-5">
              <img src={nftPlaceholder} className="rounded-xl shadow-lg" alt={nft.name} />
            </div>
          </Col>
          <Col sm={5} lg={6}>
            <h2
              className="font-poppins dark:text-white text-nft-black-1 font-semibold
          text-2xl minlg:text-3xl"
            >
              {nft.name}
            </h2>
            <div className="mt-10">
              <p
                className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-base
            font-normal"
              >
                Creator
              </p>
              <div className="flex flex-row items-center mt-3">
                <div className="relative w-12 h-12 minlg:w-20 minlg:h-20 mr-2">
                  <img src={nftPlaceholder} className="rounded-full" alt={nft.seller} />
                </div>
                <p
                  className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-base
              font-semibold"
                >
                  {nft.seller}
                </p>
              </div>

              <div className="mt-10 flex flex-col">
                <div className="w-full border-b dark:border-nft-black-1 border-nft-gray-1 flex flex-row">
                  <p
                    className="font-poppins dark:text-white text-nft-black-1 text-base minlg:text-base
              font-medium mb-2"
                  >
                    Details
                  </p>
                </div>
                <div className="mt-3">
                  <p
                    className="font-poppins dark:text-white text-nft-black-1 text-base
                font-normal"
                  >
                    {nft.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-row sm:flex-col mt-10">
                {account?.account_id === nft.seller?.toLowerCase() ? (
                  <p
                    className="font-poppins dark:text-white text-nft-black-1 text-base
                font-normal border border-gray p-2"
                  >
                    You cannot buy your own NFT.
                  </p>
                ) : account?.account_id === nft.owner?.toLowerCase() ? (
                  <Button
                    btnName="List on Marketplace"
                    classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
                    handleClick={() => console.log('List on Marketplace')}
                  />
                ) : (
                  <Button
                    btnName={`Buy for ${nft.price}`}
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

export default DetailNFT
