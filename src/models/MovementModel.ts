import { DocumentData, Timestamp } from 'firebase/firestore'
import CategoryModel from './CategoryModel'

const MOVEMENTS_COLLECTION = 'movements'

interface MovementModel {
  _id: string
  date: Date
  description: string
  amount: number
  category: CategoryModel
  _creator: string
  _wallet: string
}

// Firestore data converter
const movementConverter = {
  toFirestore: (movement: MovementModel) => {
    return {
      date: Timestamp.fromDate(movement.date),
      description: movement.description,
      amount: movement.amount,
      category: movement.category,
      _creator: movement._creator,
      _wallet: movement._wallet
    }
  },
  fromFirestore: (snapshot: DocumentData, options: any) => {
    // console.log("fromFirestore: ", options)
    const data = snapshot.data(options)
    const newMovement: MovementModel = {
      _id: snapshot.id,
      date: data.date.toDate(),
      description: data.description,
      amount: data.amount,
      category: data.category,
      _creator: data._creator,
      _wallet: data._wallet
    }
    return newMovement
  }
}

const initialMovement: MovementModel = {
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
  MOVEMENTS_COLLECTION,
  movementConverter,
  initialMovement
}
export type MovementsModel = MovementModel[]

export default MovementModel
