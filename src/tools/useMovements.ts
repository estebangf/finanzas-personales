import { useContext } from 'react'
import { MovementContextType, MovementsContext } from '../features/MovementsProvider'

const useMovements = (): MovementContextType => useContext(MovementsContext)

export default useMovements
