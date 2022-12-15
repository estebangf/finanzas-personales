import { DocumentData, Timestamp } from "firebase/firestore";
import CategoryModel from "./CategoryModel";

const WALLETS_COLLECTION = 'wallets'

interface WalletModel {
  _id: string
  _creator: string
  name: string
  balance: number
  // icon: string
  created: Date
  owners: string[]
}


// Firestore data converter
const walletConverter = {
  toFirestore: (wallet: WalletModel) => {
    return {
      _creator: wallet._creator,
      name: wallet.name,
      balance: wallet.balance,
      created: Timestamp.fromDate(wallet.created),
      owners: wallet.owners,
    }
  },
  fromFirestore: (snapshot: DocumentData, options: any) => {
    // console.log("fromFirestore: ", options)
    const data = snapshot.data(options)
    let newWallet: WalletModel = {
      _id: snapshot.id,
      _creator: data._creator,
      name: data.name,
      balance: data.balance,
      created: data.created.toDate(),
      owners: data.owners,
    }
    return newWallet;
  },
}

const initialWallet: WalletModel = {
  _id: "",
  _creator: "",
  name: "",
  balance: 0.00,
  created: new Date(),
  owners: []
}


export {
  WALLETS_COLLECTION,
  walletConverter,
  initialWallet
}
export type WalletsModel = WalletModel[];

export default WalletModel;