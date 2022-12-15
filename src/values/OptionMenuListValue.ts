import { Inbox, Wallet, PriceChange } from "@mui/icons-material"
import MenuOptionModel from "../models/MenuOptionModel"

export const menuOptions: MenuOptionModel[] = [
  { label: "Billetera", link: "/wallets", icon: Wallet },
  { label: "Movimientos", link: "/movements", icon: PriceChange },
  { label: "Transferencias", link: "/transfers", icon: Inbox },
  { label: "Creditos", link: "/credits", icon: Inbox },
]
export const menuPersonalOptions: MenuOptionModel[] = [
  { label: "Perfil", link: "/profile", icon: Inbox },
  { label: "Opciones", link: "/settings", icon: Inbox },
]

