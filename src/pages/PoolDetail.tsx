import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Banner from '../components/Banner'
import { IPool } from '../interfaces'

import creatorImg from '../assets/creator1.png'

interface PoolDetailProps {
  collections: Array<IPool>
}

const PoolDetail = (props: PoolDetailProps): JSX.Element => {
  const { collections } = props

  const [collection, setCollection] = useState<IPool | undefined>()
  const [nfts, setNFTs] = useState([])
  const [isLoading, setLoading] = useState<boolean>(true)
  const params = useParams()

  useEffect(() => {
    if (collections && params) {
      const _collection = collections.filter((collection) => collection.pool_id === Number(params.id))
      console.log('_collection', _collection[0])
      setCollection(_collection[0])
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
    <div className="w-full flex justify-start items-center flex-col min-h-screen">
      <div className="w-full flexCenter flex-col">
        <Banner name={collection?.nft_token} childStyles="text-center mb-4 text-white" parentStyles="h-80 justify-center" />

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

      {!isLoading && !nfts.length ? (
        <div className="flexCenter sm:p-4 p-16">
          <h1
            className="font-poppins dark:text-white text-nft-black-1
            font-extrabold text-3xl"
          >
            No NFTs Owned
          </h1>
        </div>
      ) : (
        <div className="p-12 sm:p-4 w-full minmd:w-4/5 flexCenter flex-col">
          <p>Hello</p>
        </div>
      )}
    </div>
  )
}

export default PoolDetail
