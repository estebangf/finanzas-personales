import { useContext } from 'react'
import { WalletsContext } from '../features/WalletsProvider'

const useWallets = () => useContext(WalletsContext)

export default useWallets
