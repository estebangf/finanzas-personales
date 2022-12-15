import React, { useEffect, useState } from "react";
import MovementModel, { MovementsModel } from "../models/MovementModel";
import { onSnapshotMovements } from "../tools/firebase.functions";
import useAuth from "../tools/useAuth";
import useWallets from "../tools/useWallets";

export interface MovementContextType {
  movements: MovementsModel
}

export const MovementsContext = React.createContext<MovementContextType>(null!);

function MovementsProvider({ children }: { children: React.ReactNode }) {
  const { firestore } = useAuth()
  const { walletSelected } = useWallets()
  const [movements, setMovements] = useState<MovementsModel>([])

  useEffect(() => {
    if (walletSelected)
      onSnapshotMovements(setMovements, walletSelected._id, firestore)
  }, [firestore, walletSelected])

  return (
    <MovementsContext.Provider value={{
      movements
    }}
    >{children}</MovementsContext.Provider>
  );
};

export default MovementsProvider;