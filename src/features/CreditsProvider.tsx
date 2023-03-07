import React, { useEffect, useState } from 'react'
import CreditModel, { CreditsModel } from '../models/CreditModel'
import { onSnapshotCredits } from '../tools/firebase.functions'
import useAuth from '../tools/useAuth'
import useWallets from '../tools/useWallets'

export interface CreditContextType {
  movements: CreditsModel
}

export const CreditsContext = React.createContext<CreditContextType>(null!)

const CreditsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { firestore } = useAuth()
  const { walletSelected } = useWallets()
  const [movements, setCredits] = useState<CreditsModel>([])

  useEffect(() => {
    if (walletSelected != null) { onSnapshotCredits(setCredits, walletSelected._id, firestore) }
  }, [firestore, walletSelected])

  return (
    <CreditsContext.Provider value={{
      movements
    }}
    >{children}</CreditsContext.Provider>
  )
}

export default CreditsProvider
