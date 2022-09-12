import React from 'react'
import { Link } from 'react-router-dom'

import nftPlaceholder from '../assets/nft1.png'
import { trimName } from '../utils/utils'
import { Col } from 'react-bootstrap'

interface INFTCardProps {
  nft: any
  onProfilePage?: boolean
}

const NFTCard = (props: INFTCardProps): JSX.Element => {
  const { nft, onProfilePage } = props
  return (
    <Col sm={6} lg={4} xl={3}>
      <Link to={{ pathname: `/nft-details/${nft.i}` }} key={nft.i}>
        <div className="dark:bg-nft-black-3 bg-white rounded-2xl p-4 sm:my-2 cursor-pointer shadow-md">
          <div className="relative w-full rounded-2xl overflow-hidden">
            <img src={nft.image ? nft.image : nftPlaceholder} alt={nft.name} />
          </div>

          <div className="mt-3 flex flex-col">
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl mt-2">{nft.name}</p>
            <div className="flexBetween mt-3 flex-row xs:flex-col xs:items-start">
              <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-md">
                {nft.price} <span className="normal"> NEAR </span>
              </p>
              <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                {trimName(onProfilePage ? nft.owner : nft.seller)}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </Col>
  )
}

export default NFTCard
