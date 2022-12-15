import { Navigate } from 'react-router-dom'
import useWallets from '../tools/useWallets'

export default function LoadingPage () {
  const { wallets, walletSelected } = useWallets()

  if ((wallets.length === 0) || (walletSelected == null)) return <Navigate to='/wallets' />
  else return <Navigate to='/movements' />
}
