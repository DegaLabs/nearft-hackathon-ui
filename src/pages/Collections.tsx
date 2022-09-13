import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { IPool } from '../interfaces'
import CollectionTableRow from '../components/CollectionTableRow'
import Banner from '../components/Banner'

interface ICollectionsProps {
  collections: Array<IPool>
}

const Collections = (props: ICollectionsProps): JSX.Element => {
  const { collections } = props
  return (
    <div className="flex justify-center py-10">
      <Container>
        <Banner
          parentStyles="justify-start mb-6 h-72 sm:h-96 p-12 xs:p-4 xs:h-44 rounded-3xl"
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left text-white leading-loose"
          name={
            <>
              the decentralized <br /> NFT marketplace
            </>
          }
        />
        <h2 className="font-poppins dark:text-white text-center text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4 mt-5">
          Collections
        </h2>
        <h3 className="text-center font-poppins mb-1.5">Don't see a collection you want?</h3>
        <h3 className="text-center font-poppins">
          Directly list{' '}
          <Link className="font-bold text-regal-blue" to="/inventory">
            your NFTs
          </Link>
          , or{' '}
          <Link className="font-bold text-regal-blue" to="/create">
            create a new pool to buy and sell
          </Link>
        </h3>
        <div className="block w-full overflow-x-auto overflow-scroll mt-5 mb-32">
          <table className="nstable-table w-full mb-3 text-primaryText">
            <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col" className="text-center">
                Listings
              </th>
              <th scope="col">Floor Price</th>
              <th scope="col">Pool Liquidity</th>
              <th scope="col" className="text-right">
                Fee
              </th>
            </tr>
            </thead>
            <tbody>
            {collections?.length > 0 ? (
              <>
                {/*TODO: pagination*/}
                {collections?.map((collection, i) => (
                  <CollectionTableRow collection={collection} key={i} index={i} />
                ))}
              </>
            ) : (
              <tr>
                <td className="px-2 text-center" colSpan={10} style={{ backgroundColor: '#e5effb' }}>
                  <span className="py-3 block">No collection</span>
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  )
}

export default Collections
