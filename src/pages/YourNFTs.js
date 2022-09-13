import React, { useEffect, useState } from 'react'
import NearFTSDK from 'nearft-sdk'
import Loader from '../components/Loader'
import Banner from '../components/Banner'

import { Container, Col, Row } from 'react-bootstrap'
import nftPlaceholder from '../assets/nft1.png'
import { trimName } from '../utils/utils'
import { nearTo } from '../utils/amount'
import { Link } from 'react-router-dom'

const YourNFTs = ({ account }) => {
  const [nfts, setNFTs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getListNFTs = async () => {
      if (account) {
        const _listNFTs = await NearFTSDK.getNFTData('testnet', account, 'nearftamm.testnet')
        const list = []
        _listNFTs.forEach((e) => list.push(...e))
        setNFTs(list)
        setLoading(false)
      }
    }
    getListNFTs()
  }, [account])

  if (loading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    )
  }

  if (!account) {
    return (
      <div className="flexStart min-h-screen">
        <p>Invalid Account</p>
      </div>
    )
  }
  return (
    <div className="w-full flex justify-start items-center flex-col min-h-screen mb-20">
      <div className="w-full flexCenter flex-col">
        <Banner name={'Your NFTs'} childStyles="text-center mb-4 text-white" parentStyles="h-80 justify-center" />

        <div className="flexCenter flex-col -mt-32 z-0">
          <p
            className="font-poppins dark:text-white text-nft-black-1
            font-semibold text-2xl mt-6"
          >
            {account}
          </p>
        </div>
      </div>

      {!loading && !nfts.length ? (
        <div className="flexCenter sm:p-4 p-16">
          <h1
            className="font-poppins dark:text-white text-nft-black-1
            font-extrabold text-3xl"
          >
            No NFTs Owned
          </h1>
        </div>
      ) : (
        <Container className="mt-20">
          <Row>
            {nfts?.map((e, i) => (
              <Col sm={6} lg={4} xl={3} key={i} className="mb-4">
                <Link to={`/nft/${e.contractId}/${e.tokenId}`}>
                  <div className="dark:bg-nft-black-3 bg-white rounded-2xl p-4 sm:my-2 shadow-md">
                    <div className="relative w-full rounded-2xl overflow-hidden">
                      <img src={e.icon ? e.icon : nftPlaceholder} alt={e?.metadata.title} />
                    </div>
                    <div className="mt-3 flex flex-col">
                      <div className="flex flex-row align-items-center">
                        <a
                          className="font-poppins text-nft-black-1 text-sm"
                          href={`https://explorer.testnet.near.org/accounts/${e?.contractId}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {trimName(e?.contractId, 12, 12, 28)}
                        </a>
                        <img className="ml-2" src={e.nftIcon} style={{ maxWidth: '20px' }} alt="" />
                      </div>
                      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-md mt-2">
                        <span className="text-nft-gray-2">#{e?.tokenId}</span>{' '}
                        {e?.metadata.title ? trimName(e?.metadata.title, 12, 10, 25) : 'No name'}
                      </p>
                      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2">
                        <span className="text-nft-gray-2">{e.price ? nearTo(e.price) : '--'} </span>
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

export default YourNFTs
