import React from 'react'
import { WalletSelectorContextProvider } from './contexts/WalletSelectorContext'
import AppRoutes from './AppRoutes'

const App: React.FC = () => {
  return (
    <WalletSelectorContextProvider>
      <AppRoutes />
    </WalletSelectorContextProvider>
  )
}

export default App
