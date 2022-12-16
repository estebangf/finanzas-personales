import React, { useEffect, useState } from 'react'
import WalletModel, { WalletsModel } from '../models/WalletModel'
import { onSnapshotWallets } from '../tools/firebase.functions'
import useAuth from '../tools/useAuth'
import { compareWallet } from '../tools/useWallets'

export interface WalletContextType {
  wallets: WalletsModel
  walletSelected?: WalletModel
  setWalletSelected: React.Dispatch<React.SetStateAction<WalletModel | undefined>>
}

export const WalletsContext = React.createContext<WalletContextType>(null!)

const WalletsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, firestore } = useAuth()
  const [wallets, setWallets] = useState<WalletsModel>([])
  const [walletSelected, setWalletSelected] = useState<WalletModel>()

  useEffect(() => {
    if (user != null) { onSnapshotWallets(setWallets, user.uid, firestore) }
  }, [firestore, user])

  useEffect(() => {
    if (wallets.length > 0) {
      if (walletSelected != null) {
        const walletFind = wallets.find(w => w._id === walletSelected._id)
        if (walletFind == null) { setWalletSelected(undefined) } else if (!compareWallet(walletFind, walletSelected)) { setWalletSelected(walletFind) }
      }
    } else if (walletSelected != null) {
      setWalletSelected(undefined)
    }
  }, [walletSelected, wallets])
  return (
    <WalletsContext.Provider value={{
      wallets,
      walletSelected,
      setWalletSelected
    }}
    >{children}</WalletsContext.Provider>
  )
}

export default WalletsProvider
