import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { providers, utils } from 'near-api-js'
import type { AccountView, CodeResult } from 'near-api-js/lib/providers/provider'
import { Transaction } from '@near-wallet-selector/core'

import type { IAccount, Message } from '../interfaces'
import { useWalletSelector } from '../contexts/WalletSelectorContext'
import { CONTRACT_ID } from '../constants'

import SignIn from './SignIn'
import Button from './Button'
import Form from './Form'
import Messages from './Messages'
import swal from 'sweetalert'

const SUGGESTED_DONATION = '0'
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const BOATLOAD_OF_GAS = utils.format.parseNearAmount('0.00000000003')!

const Content: React.FC = () => {
  const { selector, modal, accounts, accountId } = useWalletSelector()
  const [account, setAccount] = useState<IAccount | null>(null)
  const [messages, setMessages] = useState<Array<Message>>([])
  const [loading, setLoading] = useState<boolean>(false)

  console.log('get_pools', messages)

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

  const getMessages = useCallback(() => {
    const { network } = selector.options
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl })

    return provider
      .query<CodeResult>({
        request_type: 'view_account',
        account_id: CONTRACT_ID,
        method_name: 'get_pools',
        args_base64: '',
        finality: 'optimistic',
      })
      .then((res) => JSON.parse(Buffer.from(res.result).toString()))
  }, [selector])

  useEffect(() => {
    // TODO: don't just fetch once; subscribe!
    getMessages().then(setMessages)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const addMessages = useCallback(
    async (message: string, donation: string, multiple: boolean) => {
      const { contract } = selector.store.getState()
      const wallet = await selector.wallet()

      if (!multiple) {
        return wallet
          .signAndSendTransaction({
            signerId: accountId!,
            actions: [
              {
                type: 'FunctionCall',
                params: {
                  methodName: 'addMessage',
                  args: { text: message },
                  gas: BOATLOAD_OF_GAS,
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  deposit: utils.format.parseNearAmount(donation)!,
                },
              },
            ],
          })
          .then((ret) => {
            alert('success ')
          })
          .catch((err) => {
            try {
              swal('Oops', '' + err, 'error')
              //alert("fail " + err);
            } catch (e) {}
            console.log('Failed to add message ' + err)

            throw err
          })
      }

      const transactions: Array<Transaction> = []

      for (let i = 0; i < 2; i += 1) {
        transactions.push({
          signerId: accountId!,
          receiverId: contract!.contractId,
          actions: [
            {
              type: 'FunctionCall',
              params: {
                methodName: 'addMessage',
                args: {
                  text: `${message} (${i + 1}/2)`,
                },
                gas: BOATLOAD_OF_GAS,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                deposit: utils.format.parseNearAmount(donation)!,
              },
            },
          ],
        })
      }

      return wallet.signAndSendTransactions({ transactions }).catch((err) => {
        alert('Failed to add messages exception ' + err)
        console.log('Failed to add messages')

        throw err
      })
    },
    [selector, accountId],
  )

  const handleSubmit = useCallback(
    async (e: SubmitEvent) => {
      e.preventDefault()

      // TODO: Fix the typing so that target.elements exists..
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore.
      const { fieldset, message, donation, multiple } = e.target.elements

      fieldset.disabled = true

      return addMessages(message.value, donation.value || '0', multiple.checked)
        .then(() => {
          return getMessages()
            .then((nextMessages) => {
              setMessages(nextMessages)
              message.value = ''
              donation.value = SUGGESTED_DONATION
              fieldset.disabled = false
              message.focus()
            })
            .catch((err) => {
              alert('Failed to refresh messages')
              console.log('Failed to refresh messages')

              throw err
            })
        })
        .catch((err) => {
          console.error(err)

          fieldset.disabled = false
        })
    },
    [addMessages, getMessages],
  )

  if (loading) {
    return null
  }

  return (
    <Fragment>
      <div>
        {account ? (
          <>
            <Button btnName="Log Out" classStyles="mx-2 rounded-xl" handleClick={handleSignOut} />
            <Button btnName="Switch Wallet" classStyles="mx-2 rounded-xl" handleClick={handleSwitchWallet} />
          </>
        ) : (
          <Button btnName="Connect" classStyles="mx-2 rounded-xl" handleClick={handleSignIn} />
        )}
        {accounts.length > 1 && (
          <Button btnName="Switch Account" classStyles="mx-2 rounded-xl" handleClick={handleSwitchAccount} />
        )}
      </div>
      {account ? (
        <>
          <Form account={account} onSubmit={(e) => handleSubmit(e as unknown as SubmitEvent)} />
          <Messages messages={messages} />
        </>
      ) : (
        <SignIn />
      )}
    </Fragment>
  )
}

export default Content
