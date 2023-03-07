import { DocumentData, Timestamp } from 'firebase/firestore'
import CategoryModel from './CategoryModel'

const CREDITS_COLLECTION = 'credits'

interface CreditModel {
  _id: string
  date: Date
  description: string
  amount: number
  category: CategoryModel
  _creator: string
  _wallet: string
}

// Firestore data converter
const creditConverter = {
  toFirestore: (credit: CreditModel) => {
    return {
      date: Timestamp.fromDate(credit.date),
      description: credit.description,
      amount: credit.amount,
      category: credit.category,
      _creator: credit._creator,
      _wallet: credit._wallet
    }
  },
  fromFirestore: (snapshot: DocumentData, options: any) => {
    // console.log("fromFirestore: ", options)
    const data = snapshot.data(options)
    const newCredit: CreditModel = {
      _id: snapshot.id,
      date: data.date.toDate(),
      description: data.description,
      amount: data.amount,
      category: data.category,
      _creator: data._creator,
      _wallet: data._wallet
    }
    return newCredit
  }
}

const initialCredit: CreditModel = {
  _id: '',
  date: new Date(),
  description: '',
  amount: 0.00,
  // category: {
  //   value: "SIN CATEGORIA"
  // },
  category: 'SIN CATEGORIA',
  _creator: '',
  _wallet: ''
}

export {
  CREDITS_COLLECTION,
  creditConverter,
  initialCredit
}
export type CreditsModel = CreditModel[]

export default CreditModel
