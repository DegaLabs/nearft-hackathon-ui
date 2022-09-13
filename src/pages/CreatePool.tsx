import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
// @ts-ignore
import NearFTSDK from 'nearft-sdk'
import Big from 'big.js'
import { Container, Row, Col } from 'react-bootstrap'
import { useWalletSelector } from '../contexts/WalletSelectorContext'
import { toNear } from '../utils/amount'
import Select from 'react-select'

interface IFormInput {
  pool_type: string
  bonding_curve: string
  asset_id: string
  spot_price: string
  delta: string
  fee: string
  deposit_amount: string
}

const CreatePool = () => {
  const [listCollection, setListCollection] = useState<string[] | undefined>()
  const [nfts, setNFTs] = useState<any>()
  const [showList, setShowList] = useState<any>()
  const [selectedOption, setSelectedOption] = useState<any>()

  const { register, handleSubmit, watch } = useForm<IFormInput>()
  const { selector, accountId } = useWalletSelector()

  console.log('nfts', nfts)

  console.log('selectedOption', selectedOption)

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const spotPrice = toNear(data.spot_price)
    const _delta =
      data.bonding_curve === '0'
        ? Big(data.delta)
            .times(10 ** 24)
            .toFixed()
        : Big(data.delta)
            .times(10 ** 18)
            .toFixed()
    const _fee = Big(data.fee)
      .times(10 ** 18)
      .toFixed()
    const depositAmount = Big(data.deposit_amount)
      .times(10 ** 24)
      .toFixed()

    let tokenIds = []

    for (const e of selectedOption) {
      tokenIds.push(e.value)
    }

    console.log('tokenIds', tokenIds)
    //awa NearFTSDK.createPair(walletSelector-, networkId-, contractId-, accountId-, poolType-, bondingCurve-, spotPrice-, delta-, fee-, assetRecipient-, initialTokenIds, lookTil, depositAmount)
    await NearFTSDK.createPair(
      selector,
      'testnet',
      data.asset_id,
      accountId,
      data.pool_type,
      data.bonding_curve,
      spotPrice,
      _delta,
      _fee,
      accountId,
      tokenIds,
      0,
      depositAmount,
    )
  }

  useEffect(() => {
    const getListCollection = async () => {
      if (accountId) {
        const _list = await NearFTSDK.getListMyCollection('testnet', accountId)
        setListCollection(_list)
      }
    }

    getListCollection()
  }, [accountId])

  useEffect(() => {
    const getListNFTs = async () => {
      if (accountId) {
        const _listNFTs = await NearFTSDK.getNFTData('testnet', accountId, 'nearftamm.testnet')
        // @ts-ignore
        const list = []
        // @ts-ignore
        _listNFTs.forEach((e) => list.push(...e))
        // @ts-ignore
        setNFTs(list)
      }
    }
    getListNFTs()
  }, [accountId])

  useEffect(() => {
    const _assetId = watch('asset_id')
    if (nfts?.length > 0) {
      // @ts-ignore
      const _showList = nfts.filter((item) => item.contractId === _assetId)
      console.log('_showList', _showList)
      // @ts-ignore
      let showListValue = []
      for (const e of _showList) {
        showListValue.push({ value: e.tokenId, label: e.tokenId })
      }
      setSelectedOption(null)
      setShowList(showListValue)
    }
  }, [watch('asset_id', nfts)])

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <Container>
        <Row className="align-items-center justify-center">
          <Col md={6} lg={5}>
            <h2 className="font-poppins dark:text-white text-center text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
              Create Pool
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col mb-2.5">
                <label className="mb-1 font-poppins font-medium text-nft-gray-2">Pool Type</label>
                <select className="border h-40 rounded-md px-2.5" {...register('pool_type')}>
                  <option value="0">Buy NFTs with NEAR</option>
                  <option value="1">Sell NFTs for NEAR</option>
                  <option value="2">Do both and earn trading fees</option>
                </select>
              </div>

              <div className="flex flex-col mb-2.5">
                <label className="mb-1 font-poppins font-medium text-nft-gray-2">Bonding Curve</label>
                <select className="border h-40 rounded-md px-2.5" {...register('bonding_curve')}>
                  <option value="0">Linear Curve</option>
                  <option value="1">Exponential Curve</option>
                </select>
              </div>

              <div className="flex flex-col mb-2.5">
                <label className="mb-1 font-poppins font-medium text-nft-gray-2">NFT Contract ID</label>
                <select className="border h-40 rounded-md px-2.5" {...register('asset_id')}>
                  <option disabled selected>
                    -- Select contract ID --
                  </option>
                  {listCollection?.map((collection, i) => (
                    <option value={collection} key={i}>
                      {collection}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col mb-2.5">
                <label className="mb-1 font-poppins font-medium text-nft-gray-2">Spot Price(NEAR)</label>
                <input className="border h-40 rounded-md px-2.5" {...register('spot_price')} />
              </div>

              <div className="flex flex-col mb-2.5">
                <label className="mb-1 font-poppins font-medium text-nft-gray-2">Delta</label>
                <input className="border h-40 rounded-md px-2.5" {...register('delta')} />
              </div>

              <div className="flex flex-col mb-2.5">
                <label className="mb-1 font-poppins font-medium text-nft-gray-2">Fee</label>
                <input className="border h-40 rounded-md px-2.5" {...register('fee')} />
              </div>

              <div className="flex flex-col mb-2.5">
                <label className="mb-1 font-poppins font-medium text-nft-gray-2">Deposit Amount</label>
                <input className="border h-40 rounded-md px-2.5" {...register('deposit_amount')} />
              </div>

              <div className="flex flex-col mb-2.5">
                <label className="mb-1 font-poppins font-medium text-nft-gray-2">Select NFTs</label>
                <Select
                  isMulti
                  value={selectedOption}
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={showList}
                />
              </div>

              <input
                className="w-full mt-3 nft-gradient text-sm minlg:text-lg py-2 px-6 minlg:px-8 font-poppins font-semibold text-white rounded-xl"
                type="submit"
              />
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default CreatePool
