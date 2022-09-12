import React, { useEffect, useState} from 'react'
import Loader from '../components/Loader'
import Banner from '../components/Banner'
import { IAccount } from '../interfaces'

import creatorImg from '../assets/creator1.png'

interface MyNFTsProps {
  account: IAccount | null
  isLoading: boolean
}

// function YourNFTs(): JSX.Element {
const YourNFTs: React.FC<MyNFTsProps> = ({ account, isLoading }) => {

  const [nfts, setNFTs] = useState([])
  const [nftsCopy, setNftsCopy] = useState([])

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
        <Banner name={'Your Nifty NFTs'} childStyles="text-center mb-4 text-white" parentStyles="h-80 justify-center" />

        <div className="flexCenter flex-col -mt-20 z-0">
          <div className="flexCenter w-40 h-40 sm:w-36 sm:h-36 p-1 bg-nft-black-2 rounded-full">
            <img src={creatorImg} className="rounded-full object-cover" alt={account?.account_id}/>
          </div>
          <p
            className="font-poppins dark:text-white text-nft-black-1
            font-semibold text-2xl mt-6"
          >
            {account?.account_id}
          </p>
        </div>
      </div>

      {!isLoading && !nfts.length && !nftsCopy.length ? (
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
          {/*<div className='flex flex-1 w-full sm:flex-col px-4 xs:px-0 minlg:px-8'>*/}
          {/*  <SearchBar*/}
          {/*    activeSelect={activeSelect}*/}
          {/*    setActiveSelect={setActiveSelect}*/}
          {/*    handleSearch={onHandleSearch}*/}
          {/*    clearSearch={onClearSearch}*/}
          {/*  />*/}
          {/*</div>*/}
          {/*<div className='mt-3 w-full flex flex-wrap'>*/}
          {/*  { nfts.map((nft) => <NFTCard key={nft.token} nft={nft} onProfilePage/>)}*/}
          {/*</div>*/}
          <p>Hello</p>
        </div>
      )}
    </div>
  )
}

export default YourNFTs
