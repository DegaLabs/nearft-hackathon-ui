import { IPool } from '../interfaces'
import { useNavigate } from 'react-router-dom'
import { toRoundedReadableNumber } from '../utils/number'
import React from 'react'

function CollectionTableRow({ collection, index }: { collection: IPool; index: number }) {
  const navigate = useNavigate()
  return (
    <tr
      key={index}
      className="cursor-pointer hover:bg-blue-50"
      onClick={() => navigate(`/collection/${collection.pool_id}`)}
    >
      <td>
        <span className="text-bold">{collection.nft_token}</span>
      </td>
      <td className="text-center">{collection.pool_token_ids.length}</td>
      <td>
        {toRoundedReadableNumber({
          decimals: 24,
          number: collection.spot_price,
          precision: 4,
        })}{' '}
        NEAR
      </td>
      <td>
        {toRoundedReadableNumber({
          decimals: 24,
          number: collection.near_balance,
          precision: 4,
        })}{' '}
        NEAR
      </td>
      <td className="text-right">
        {toRoundedReadableNumber({
          decimals: 24,
          number: collection.fee,
          precision: 4,
        })}{' '}
        NEAR
      </td>
    </tr>
  )
}

export default CollectionTableRow
