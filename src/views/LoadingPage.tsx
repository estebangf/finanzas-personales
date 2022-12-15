import { Navigate } from "react-router-dom";
import useWallets from "../tools/useWallets";

export default function LoadingPage() {
  const { wallets, walletSelected } = useWallets();

  if (!wallets.length || !walletSelected) return <Navigate to='/wallets' />
  else return <Navigate to='/movements' />
}