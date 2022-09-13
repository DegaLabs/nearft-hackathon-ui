import React, { useCallback, useEffect, useState } from 'react'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'

import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import { useWalletSelector } from './contexts/WalletSelectorContext'

import Content from './components/Content'
import Homepage from './pages/Homepage'
// @ts-ignore
import YourNFTs from './pages/YourNFTs'
import DetailNFT from './pages/DetailNFT'

import { IAccount, IPool } from './interfaces'
import { providers } from 'near-api-js'
import { AccountView } from 'near-api-js/lib/providers/provider'
import Button from './components/Button'
import Collections from './pages/Collections'
import CreatePool from './pages/CreatePool'
import YourPools from './pages/YourPools'
import PoolDetail from './pages/PoolDetail'
import { CONTRACT_ID } from './constants'
// @ts-ignore
import NearFTSDK from 'nearft-sdk'
import PoolNFTItem from './pages/PoolNFTItem'

const listNFT = [
  {
    tokenId: 1,
    name: `Nifty NFT 424242`,
    image: '',
    price: 9,
    seller: 'degalabs.testnet',
    owner: 'degalabs.testnet',
    description: 'Cool NFT on Sale',
  },
  {
    tokenId: 2,
    name: `Nifty NFT 56665`,
    image: '',
    price: 9,
    seller: 'duongpadev.testnet',
    owner: 'duongpadev.testnet',
    description: 'Cool NFT on Sale',
  },
  {
    tokenId: 3,
    name: `Nifty NFT 131453`,
    image: '',
    price: 9,
    seller: 'degalabs.testnet',
    owner: 'degalabs.testnet',
    description: 'Cool NFT on Sale',
  },
  {
    tokenId: 4,
    name: `Nifty NFT 42142`,
    image: '',
    price: 9,
    seller: 'duongpadev.testnet',
    owner: 'duongpadev.testnet',
    description: 'Cool NFT on Sale',
  },
  {
    tokenId: 5,
    name: `Nifty NFT 1414`,
    image: '',
    price: 9,
    seller: 'duongpadev.testnet',
    owner: 'duongpadev.testnet',
    description: 'Cool NFT on Sale',
  },
  {
    tokenId: 6,
    name: `Nifty NFT 11341`,
    image: '',
    price: 9,
    seller: 'duongpadev.testnet',
    owner: 'duongpadev.testnet',
    description: 'Cool NFT on Sale',
  },
  {
    tokenId: 7,
    name: `Nifty NFT 1131`,
    image: '',
    price: 9,
    seller: 'duongpadev.testnet',
    owner: 'duongpadev.testnet',
    description: 'Cool NFT on Sale',
  },
  {
    tokenId: 8,
    name: `Nifty NFT 14343`,
    image: '',
    price: 9,
    seller: 'duongpadev.testnet',
    owner: 'duongpadev.testnet',
    description: 'Cool NFT on Sale',
  },
  {
    tokenId: 9,
    name: `Nifty NFT 14343`,
    image: '',
    price: 9,
    seller: 'duongpadev.testnet',
    owner: 'duongpadev.testnet',
    description: 'Cool NFT on Sale',
  },
  {
    tokenId: 10,
    name: `Nifty NFT 14232`,
    image: '',
    price: 9,
    seller: 'duongpadev.testnet',
    owner: 'duongpadev.testnet',
    description: 'Cool NFT on Sale',
  },
  {
    tokenId: 11,
    name: `Nifty NFT 15454`,
    price: 9,
    image: '',
    seller: 'duongpadev.testnet',
    owner: 'duongpadev.testnet',
    description: 'Cool NFT on Sale',
  },
  {
    tokenId: 12,
    name: `Nifty NFT 14343`,
    image: '',
    price: 9,
    seller: 'duongpadev.testnet',
    owner: 'duongpadev.testnet',
    description: 'Cool NFT on Sale',
  },
  {
    tokenId: 13,
    name: `Nifty NFT 132323`,
    price: 9,
    image: '',
    seller: 'duongpadev.testnet',
    owner: 'duongpadev.testnet',
    description: 'Cool NFT on Sale',
  },
  {
    tokenId: 14,
    name: `Nifty NFT 124242`,
    image: '',
    price: 9,
    seller: 'duongpadev.testnet',
    owner: 'duongpadev.testnet',
    description: 'Cool NFT on Sale',
  },
]

const AppRoutes: React.FC = () => {
  const { selector, modal, accounts, accountId } = useWalletSelector()
  const [account, setAccount] = useState<IAccount | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [collections, setCollections] = useState<IPool[] | undefined>()

  const getAccount = useCallback(async (): Promise<IAccount | null> => {
    if (!accountId) {
      return null
    }

    const { network } = selector.options
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl })

    return provider
      .query<AccountView>({
        request_type: 'view_account',
        finality: 'final',
        account_id: accountId,
      })
      .then((data) => ({
        ...data,
        account_id: accountId,
      }))
  }, [accountId, selector.options])

  const handleSignIn = () => {
    modal.show()
  }

  const handleSignOut = async () => {
    const wallet = await selector.wallet()

    wallet.signOut().catch((err) => {
      console.log('Failed to sign out')
      console.error(err)
    })
  }

  const handleSwitchWallet = () => {
    modal.show()
  }

  const handleSwitchAccount = () => {
    const currentIndex = accounts.findIndex((x) => x.accountId === accountId)
    const nextIndex = currentIndex < accounts.length - 1 ? currentIndex + 1 : 0

    const nextAccountId = accounts[nextIndex].accountId

    selector.setActiveAccount(nextAccountId)

    alert('Switched account to ' + nextAccountId)
  }

  useEffect(() => {
    if (!accountId) {
      return setAccount(null)
    }

    setLoading(true)

    getAccount().then((nextAccount) => {
      setAccount(nextAccount)
      setLoading(false)
    })
  }, [accountId, getAccount])

  useEffect(() => {
    const getCollections = async () => {
      const _collections = await NearFTSDK.getPools('testnet', CONTRACT_ID)
      console.log('_collections', _collections)
      setCollections(_collections)
    }
    getCollections()
  }, [])

  return (
    <BrowserRouter>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={NavLink} to="/" className="mr-5">
            NearFT
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/collections">
                Collections
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/inventory">
                Your NFTs
              </Nav.Link>
              <Nav.Link as={Link} to="/pool">
                Your Pools
              </Nav.Link>
              {account ? (
                <NavDropdown
                  title={account.account_id}
                  className="nft-gradient text-sm minlg:text-lg py-1 px-3 font-poppins font-semibold text-white lg:ml-3 rounded-xl"
                  id="collasible-nav-dropdown"
                >
                  {accounts.length > 1 && (
                    <NavDropdown.Item onClick={handleSwitchAccount}>Switch Account</NavDropdown.Item>
                  )}
                  <NavDropdown.Item onClick={handleSwitchWallet}>Switch Wallet</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleSignOut}>Sign Out</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Button btnName="Connect" classStyles="mx-2 rounded-xl" handleClick={handleSignIn} />
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/*
        // @ts-ignore */}
        <Route path="/collections" element={<Collections collections={collections} />} />
        {/*
        // @ts-ignore */}
        <Route path="/collection/:id" element={<PoolDetail collections={collections} />} />
        <Route path="/collection/:id/:detail" element={<PoolNFTItem account={account} collections={collections} />} />
        <Route path="/pool" element={<YourPools collections={collections} />} />
        <Route path="/create" element={<CreatePool />} />
        <Route path="/content" element={<Content />} />
        <Route path="/inventory" element={<YourNFTs account={accountId} />} />
        <Route path="/nft/:nftContract/:id" element={<DetailNFT account={account} collections={collections} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
