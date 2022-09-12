import React, { useState, useEffect, useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useWalletSelector } from '../contexts/WalletSelectorContext'
import Button from './Button'

let menus = [
  {
    name: 'Explore NFTs',
    url: '/',
  },
  {
    name: 'Listed NFTs',
    url: '/listed-nfts',
  },
  {
    name: 'My NFTs',
    url: '/my-nfts',
  },
]

const Navbar = () => {

  return (
    <nav
      className="flexBetween w-full fixed z-10 p-4 flex-row border-b
      dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1"
    >
      <div className="flex flex-1 flex-row justify-start">
        <Link to="/">
          <div className="flexCenter md:hidden cursor-pointer">
            <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1">NearFT AMM</p>
          </div>
        </Link>
      </div>

      {/* Desktop Nav */}
      <div className="flex flex-initial flex-row justify-end">
        <div className="md:hidden flex">
          {menus.map((menu) => (
            <NavLink
              style={({ isActive }) => {
                return {
                  display: 'block',
                  margin: '1rem 0',
                  color: isActive ? 'red' : '',
                }
              }}
              to={`/${menu.url}`}
              key={menu.url}
            >
              {menu.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
