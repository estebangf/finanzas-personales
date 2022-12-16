import { useContext } from 'react'
import { WalletContextType, WalletsContext } from '../features/WalletsProvider'
import WalletModel from '../models/WalletModel'

const useWallets = (): WalletContextType => useContext(WalletsContext)

export default useWallets

export function compareWallet (w1: WalletModel, w2: WalletModel): boolean {
  const
    balance = w1.balance === w2.balance
  const name = w1.name === w2.name
  let owners = w1.owners.length === w2.owners.length
  if (owners) {
    w1.owners.forEach(o => {
      if (owners) owners = w2.owners.includes(o)
    })
  }
  return balance && name && owners
}
