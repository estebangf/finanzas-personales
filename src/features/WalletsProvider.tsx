import React, { useEffect, useState } from "react";
import WalletModel, { WalletsModel } from "../models/WalletModel";
import { onSnapshotWallets } from "../tools/firebase.functions";
import useAuth from "../tools/useAuth";

export interface WalletContextType {
  wallets: WalletsModel
  walletSelected?: WalletModel
  setWalletSelected: React.Dispatch<React.SetStateAction<WalletModel | undefined>>
}

export const WalletsContext = React.createContext<WalletContextType>(null!);

function WalletsProvider({ children }: { children: React.ReactNode }) {
  const { user, firestore } = useAuth()
  const [wallets, setWallets] = useState<WalletsModel>([])
  const [walletSelected, setWalletSelected] = useState<WalletModel>()

  useEffect(() => {
    if (user)
      onSnapshotWallets(setWallets, user.uid, firestore)
  }, [firestore, user])

  useEffect(() => {
    if (wallets.length) {
      if (walletSelected) {
        let walletFind = wallets.find(w => w._id === walletSelected._id)
        if (!walletFind)
          setWalletSelected(undefined)
        else if (!compareWallet(walletFind, walletSelected))
          setWalletSelected(walletFind)
      }
    } else if (walletSelected) {
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
  );
};

export default WalletsProvider;

function compareWallet(w_1: WalletModel, w_2: WalletModel) {
  let
    balance = w_1.balance === w_2.balance,
    name = w_1.name === w_2.name,
    owners = w_1.owners.length === w_2.owners.length;
  w_1.owners.forEach(o => {
    if (!owners)
      return;
    else
      owners = w_2.owners.includes(o)
  })
  return balance && name && owners;
}
