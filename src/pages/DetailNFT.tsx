// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// @ts-ignore
import NearFTSDK from 'nearft-sdk'
import Button from '../components/Button'
import nftPlaceholder from '../assets/nft1.png'
import Loader from '../components/Loader'
import { IAccount, IPool } from '../interfaces'
import { Col, Container, Row } from 'react-bootstrap'
import { trimName } from '../utils/utils'
import { CONTRACT_ID } from '../constants'
import { useWalletSelector } from '../contexts/WalletSelectorContext'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'

interface IDetailNFTProps {
  account: IAccount | null
  collections: Array<IPool> | undefined
}

const DetailNFT: React.FC<IDetailNFTProps> = ({ account, collections }) => {
  const [nft, setNFT] = useState<any>()
  const [isDeposited, setDeposited] = useState<boolean>(false)
  const [empty, setEmpty] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isSelling, setSelling] = useState<boolean>(false)
  const navigate = useNavigate()

  const { id, nftContract } = useParams()
  const { selector, accountId } = useWalletSelector()

  console.log('nft', nft)

  // @ts-ignore
  const onSell = async (
    networkId,
    ammContractId,
    pools,
    nftContractId,
    tokenIds,
    slippage,
    walletSelector,
    accountId,
  ) => {
    setSelling(true)
    try {
      await NearFTSDK.sellNFT(
        networkId,
        ammContractId,
        pools,
        nftContractId,
        tokenIds,
        slippage,
        walletSelector,
        accountId,
      )
      navigate("/inventory")
    } catch (e) {
      // eslint-disable-next-line no-useless-concat
      swal("Oops!", "Something went wrong!" + "\n" + e.toString(), "error");
    }
    setSelling(false)
  }

  useEffect(() => {
    const getListNFTs = async () => {
      if (nftContract && id) {
        const _NFT = await NearFTSDK.getMetadataOfNFT('testnet', nftContract, id)
        const isDepositedBy = await NearFTSDK.isTokenDepositedBy('testnet', CONTRACT_ID, nftContract, accountId, id)
        console.log('isDepositedBy', isDepositedBy, CONTRACT_ID, nftContract, accountId, id)
        setDeposited(isDepositedBy)
        if (!_NFT) {
          setEmpty(true)
        } else {
          setNFT(_NFT)
          setLoading(false)
        }
      }
    }
    getListNFTs()
  }, [nftContract, id, accountId])

  if (isLoading) return <Loader />

  if (empty)
    return (
      <div className="my-20">
        <h2 className="font-poppins dark:text-white text-nft-black-1 text-center font-semibold text-2xl minlg:text-3xl">
          Not found
        </h2>
      </div>
    )
  console.log('nft', nft)
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
                  target="_blank" rel="noreferrer"
                >
                  {trimName(nft?.ownerId, 12, 12, 28)}
                </a>
                {}
              </p>

              <div className="flex flex-row align-items-center my-2">
                {nft?.nftIcon && <img className="mr-2" src={nft?.nftIcon} style={{ maxWidth: '20px' }} alt="" />}
                <a
                  className="font-poppins text-nft-black-1 text-sm"
                  href={`https://explorer.testnet.near.org/accounts/${nft?.contractId}`}
                  target="_blank" rel="noreferrer"
                >
                  {trimName(nft?.contractId, 12, 12, 28)}
                </a>
              </div>

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
                {(account?.account_id === nft?.ownerId || isDeposited) && (
                  <Button
                    btnName={`Sell #${nft?.tokenId}`}
                    classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl w-full"
                    loading={isSelling}
                    // handleClick={() => console.log('hehe')}
                    handleClick={() =>
                      onSell(
                        'testnet',
                        CONTRACT_ID,
                        collections,
                        nft?.contractId,
                        nft?.tokenId,
                        0.1,
                        selector,
                        accountId,
                      )
                    }
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
