import { collection, onSnapshot, addDoc, Firestore, query, where, updateDoc, doc, increment, getDoc } from "firebase/firestore";
import MovementModel, { movementConverter, MovementsModel, MOVEMENTS_COLLECTION } from "../models/MovementModel";
import WalletModel, { walletConverter, WalletsModel, WALLETS_COLLECTION } from "../models/WalletModel";
import { getComparator } from "./getComparator";

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

export const onSnapshotMovements = (setMovements: (movements: MovementsModel) => void, wid: string, firestore: Firestore) => {
  let ref = collection(firestore, MOVEMENTS_COLLECTION).withConverter(movementConverter)
  let queryMovements = query(ref, where("_wallet", "==", wid))
  onSnapshot(queryMovements, _movements => {
    let movements: MovementsModel = []
    _movements.forEach(_movement => {
      movements.push(_movement.data())
    });
    setMovements(movements.slice().sort(getComparator('desc', 'date')))
  })
}

export const createMovement = (movement: MovementModel, firestore: Firestore) => new Promise<void>((resolve, reject) => {
  console.log("movement: ", movement);
  let queryMovements = collection(firestore, MOVEMENTS_COLLECTION).withConverter(movementConverter)
  addDoc(queryMovements, movement).then(result => {
    updateWalletBalance(movement._wallet, movement.amount, firestore).then(resultWallet => {
      resolve()
    })
  })
})

export const getMovement = (movement_id: string, firestore: Firestore) => new Promise<MovementModel>((resolve, reject) => {
  let queryMovements = doc(firestore, MOVEMENTS_COLLECTION, movement_id).withConverter(movementConverter)
  getDoc(queryMovements).then(result => {
    if (result.exists())
      resolve(result.data())
    else
      reject("Movimiento inexistente")
  })
})

export const updateMovement = (movement: MovementModel, firestore: Firestore) => new Promise<void>((resolve, reject) => {
  let queryMovements = doc(firestore, MOVEMENTS_COLLECTION, movement._id).withConverter(movementConverter)
  getMovement(movement._id, firestore).then(_movement => {
    let diferential = movement.amount - _movement.amount;
    updateDoc(queryMovements, movement).then(result => {
      if (diferential !== 0)
        updateWalletBalance(movement._wallet, diferential, firestore).then(r => {
          resolve()
        })
      else resolve()
    })
  })
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






export const onSnapshotWallets = (setWallets: (wallets: WalletsModel) => void, uid: string, firestore: Firestore) => {
  let ref = collection(firestore, WALLETS_COLLECTION).withConverter(walletConverter)
  let queryWallets = query(ref, where("owners", "array-contains", uid))
  onSnapshot(queryWallets, _wallets => {
    let wallets: WalletsModel = []
    _wallets.forEach(_wallet => {
      wallets.push(_wallet.data())
    });
    setWallets(wallets.slice().sort(getComparator('desc', 'name')))
  })
}

export const createWallet = (wallet: WalletModel, firestore: Firestore) => new Promise<void>((resolve, reject) => {
  let queryWallets = collection(firestore, WALLETS_COLLECTION).withConverter(walletConverter)
  addDoc(queryWallets, wallet).then(result => {
    resolve()
  })
})

export const updateWallet = (wallet: WalletModel, firestore: Firestore) => new Promise<void>((resolve, reject) => {
  let queryWallets = doc(firestore, WALLETS_COLLECTION, wallet._id).withConverter(walletConverter)
  updateDoc(queryWallets, wallet).then(result => {
    resolve()
  })
})

export const updateWalletBalance = (wallet_id: string, mod: number, firestore: Firestore) => new Promise<void>((resolve, reject) => {
  let queryWallets = doc(firestore, WALLETS_COLLECTION, wallet_id).withConverter(walletConverter)
  updateDoc(queryWallets, {
    balance: increment(mod)
  }).then(result => {
    resolve()
  })
})

