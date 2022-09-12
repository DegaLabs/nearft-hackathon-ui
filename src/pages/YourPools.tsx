import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import Button from '../components/Button'
import { useWalletSelector } from '../contexts/WalletSelectorContext'
import { IPool } from '../interfaces'
import CollectionTableRow from '../components/CollectionTableRow'

interface IYourPoolProps {
  collections: Array<IPool> | undefined
}

const YourPools = (props: IYourPoolProps): JSX.Element => {
  const { collections } = props
  const navigate = useNavigate()
  const { accountId } = useWalletSelector()

  const [yourCollections, setYourCollections] = useState<IPool[] | undefined>()

  useEffect(() => {
    if (collections && accountId) {
      const _yourCollections = collections.filter((collection) => collection.owner === accountId)
      console.log('_yourCollections', _yourCollections)
      setYourCollections(_yourCollections)
    }
  }, [collections, accountId])

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <Container>
        <Row>
          <Col className="text-center">
            <h2 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
              Pools Overview
            </h2>
            <h3 className="font-poppins">
              View all of the pools that{' '}
              <span className="font-poppins font-semibold text-nft-black-1">{accountId}</span> provides liquidity for.
            </h3>

            <div className="block w-full overflow-x-auto overflow-scroll mt-5">
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
                  {/*
                  // @ts-ignore */}
                  {yourCollections?.length > 0 ? (
                    <>
                      {/*TODO: pagination*/}
                      {yourCollections?.map((collection, i) => (
                        <CollectionTableRow collection={collection} key={i} index={i} />
                      ))}
                    </>
                  ) : (
                    <tr>
                      <td className="px-2 text-center" colSpan={10} style={{ backgroundColor: '#e5effb' }}>
                        <span className="py-3 block">No pools</span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <Button btnName="Create New Pool +" classStyles="rounded-lg mt-3" handleClick={() => navigate('/create')} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default YourPools
