import { collection, onSnapshot, addDoc, Firestore, query, where, updateDoc, doc, increment, getDoc } from 'firebase/firestore'
import MovementModel, { movementConverter, MovementsModel, MOVEMENTS_COLLECTION } from '../models/MovementModel'
import WalletModel, { walletConverter, WalletsModel, WALLETS_COLLECTION } from '../models/WalletModel'
import { getComparator } from './getComparator'

// export const getMovements = (firestore: Firestore) => new Promise<MovementsModel>((resolve, reject) => {
//   let queryMovements = collection(firestore, MOVEMENTS_COLLECTION).withConverter(movementConverter)
//   getDocs(queryMovements).then(_movements => {
//     let movements: MovementsModel = []
//     _movements.forEach(_movement => {
//       movements.push(_movement.data())
//     });
//     resolve(movements.slice().sort(getComparator('desc', 'date')))
//   })
// })

export const onSnapshotMovements = (setMovements: (movements: MovementsModel) => void, wid: string, firestore: Firestore): void => {
  const ref = collection(firestore, MOVEMENTS_COLLECTION).withConverter(movementConverter)
  const queryMovements = query(ref, where('_wallet', '==', wid))
  onSnapshot(queryMovements, _movements => {
    const movements: MovementsModel = []
    _movements.forEach(_movement => {
      movements.push(_movement.data())
    })
    setMovements(movements.slice().sort(getComparator('desc', 'date')))
  })
}

export const createMovement = (movement: MovementModel, firestore: Firestore): Promise<void> => new Promise<void>((resolve, reject) => {
  console.log('movement: ', movement)
  const queryMovements = collection(firestore, MOVEMENTS_COLLECTION).withConverter(movementConverter)
  addDoc(queryMovements, movement).then(result => {
    updateWalletBalance(movement._wallet, movement.amount, firestore).then(resultWallet => {
      resolve()
    })
      .catch(e => reject(e))
  })
    .catch(e => reject(e))
})

export const getMovement = (movementId: string, firestore: Firestore): Promise<MovementModel> => new Promise<MovementModel>((resolve, reject) => {
  const queryMovements = doc(firestore, MOVEMENTS_COLLECTION, movementId).withConverter(movementConverter)
  getDoc(queryMovements).then(result => {
    if (result.exists()) { resolve(result.data()) } else { reject(new Error('Movimiento inexistente')) }
  })
    .catch(e => reject(e))
})

export const updateMovement = (movement: MovementModel, firestore: Firestore): Promise<void> => new Promise<void>((resolve, reject) => {
  const queryMovements = doc(firestore, MOVEMENTS_COLLECTION, movement._id).withConverter(movementConverter)
  getMovement(movement._id, firestore).then(_movement => {
    const diferential = movement.amount - _movement.amount
    updateDoc(queryMovements, movement).then(result => {
      if (diferential !== 0) {
        updateWalletBalance(movement._wallet, diferential, firestore).then(r => {
          resolve()
        })
          .catch(e => reject(e))
      } else resolve()
    })
      .catch(e => reject(e))
  })
    .catch(e => reject(e))
})

// export const getWallets = (firestore: Firestore) => new Promise<WalletsModel>((resolve, reject) => {
//   let queryWallets = collection(firestore, WALLETS_COLLECTION).withConverter(walletConverter)
//   getDocs(queryWallets).then(_wallets => {
//     let wallets: WalletsModel = []
//     _wallets.forEach(_wallet => {
//       wallets.push(_wallet.data())
//     });
//     resolve(wallets.slice().sort(getComparator('desc', 'name')))
//   })
// })

export const onSnapshotWallets = (setWallets: (wallets: WalletsModel) => void, uid: string, firestore: Firestore): void => {
  const ref = collection(firestore, WALLETS_COLLECTION).withConverter(walletConverter)
  const queryWallets = query(ref, where('owners', 'array-contains', uid))
  onSnapshot(queryWallets, _wallets => {
    const wallets: WalletsModel = []
    _wallets.forEach(_wallet => {
      wallets.push(_wallet.data())
    })
    setWallets(wallets.slice().sort(getComparator('desc', 'name')))
  })
}

export const createWallet = (wallet: WalletModel, firestore: Firestore): Promise<void> => new Promise<void>((resolve, reject) => {
  const queryWallets = collection(firestore, WALLETS_COLLECTION).withConverter(walletConverter)
  addDoc(queryWallets, wallet).then(result => {
    resolve()
  })
    .catch(e => reject(e))
})

export const updateWallet = (wallet: WalletModel, firestore: Firestore): Promise<void> => new Promise<void>((resolve, reject) => {
  const queryWallets = doc(firestore, WALLETS_COLLECTION, wallet._id).withConverter(walletConverter)
  updateDoc(queryWallets, wallet).then(result => {
    resolve()
  })
    .catch(e => reject(e))
})

export const updateWalletBalance = (walletId: string, mod: number, firestore: Firestore): Promise<void> => new Promise<void>((resolve, reject) => {
  const queryWallets = doc(firestore, WALLETS_COLLECTION, walletId).withConverter(walletConverter)
  updateDoc(queryWallets, {
    balance: increment(mod)
  }).then(result => {
    resolve()
  })
    .catch(e => reject(e))
})
