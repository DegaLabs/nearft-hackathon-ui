import React, { useCallback, useContext, useEffect, useState } from 'react'
import { map, distinctUntilChanged } from 'rxjs'
import { setupWalletSelector } from '@near-wallet-selector/core'
import type { WalletSelector, AccountState } from '@near-wallet-selector/core'
import { setupModal } from '@near-wallet-selector/modal-ui'
import type { WalletSelectorModal } from '@near-wallet-selector/modal-ui'
import { setupNearWallet } from '@near-wallet-selector/near-wallet'
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet'
import { setupSender } from '@near-wallet-selector/sender'
import { setupNearFi } from '@near-wallet-selector/nearfi'
// import { setupNearFi } from "@near-wallet-selector/nearfi";
import { CONTRACT_ID } from '../constants'

declare global {
  interface Window {
    selector: WalletSelector
    modal: WalletSelectorModal
  }
}

interface WalletSelectorContextValue {
  selector: WalletSelector
  modal: WalletSelectorModal
  accounts: Array<AccountState>
  accountId: string | null
}

type Props = {
  children?: React.ReactNode
}

const WalletSelectorContext = React.createContext<WalletSelectorContextValue | null>(null)

export const WalletSelectorContextProvider: React.FC<Props> = ({ children }) => {
  const [selector, setSelector] = useState<WalletSelector | null>(null)
  const [modal, setModal] = useState<WalletSelectorModal | null>(null)
  const [accounts, setAccounts] = useState<Array<AccountState>>([])

  const init = useCallback(async () => {
    const _selector = await setupWalletSelector({
      network: 'testnet',
      debug: true,
      modules: [
        setupNearWallet(),
        setupMyNearWallet(),
        setupSender(),
        setupNearFi()
        // setupNearFi(),
      ],
    })
    const _modal = setupModal(_selector, { contractId: CONTRACT_ID })
    const state = _selector.store.getState()
    setAccounts(state.accounts)

    window.selector = _selector
    window.modal = _modal

    setSelector(_selector)
    setModal(_modal)
  }, [])

  useEffect(() => {
    init().catch((err) => {
      console.error(err)
      alert('Failed to initialise wallet selector')
    })
  }, [init])

  useEffect(() => {
    if (!selector) {
      return
    }

    const subscription = selector.store.observable
      .pipe(
        map((state) => state.accounts),
        distinctUntilChanged(),
      )
      .subscribe((nextAccounts) => {
        console.log('Accounts Update', nextAccounts)

        setAccounts(nextAccounts)
      })

    return () => subscription.unsubscribe()
  }, [selector])

  if (!selector || !modal) {
    return null
  }

  const accountId = accounts.find((account) => account.active)?.accountId || null

  return (
    <WalletSelectorContext.Provider
      value={{
        selector,
        modal,
        accounts,
        accountId,
      }}
    >
      {children}
    </WalletSelectorContext.Provider>
  )
}

export function useWalletSelector() {
  const context = useContext(WalletSelectorContext)

  if (!context) {
    throw new Error('useWalletSelector must be used within a WalletSelectorContextProvider')
  }

  return context
}
