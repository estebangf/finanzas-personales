import { Castle } from '@mui/icons-material'
import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { CategoryListIcons } from '../models/CategoryModel'
import WalletModel from '../models/WalletModel'
import useWallets from '../tools/useWallets'

interface WalletProps {
  wallet: WalletModel
}
export default function WalletItem ({ wallet }: WalletProps) {
  const { setWalletSelected } = useWallets()
  const navigate = useNavigate()
  // const Icon = CategoryListIcons[wallet.category];
  const getColor = () => wallet.balance < 0 ? '#ff6b6b' : '#47aeec'

  return (
    <Link to='/movements' style={{
      color: 'inherit',
      textDecoration: 'none'
    }}>
      <ListItem
        sx={{
          bgcolor: '#FFFFFF',
          userSelect: 'none',
          borderRadius: 2,
          mb: 2,
          boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px'
        }}
        onClick={() => {
          setWalletSelected(wallet)
          // navigate('/movements')
        }}
        onAuxClick={e => {
          e.preventDefault()
          navigate(wallet._id)
        }}
      >
        <ListItemText sx={{
          textAlign: 'start'
        }}
          primary={<Typography variant="subtitle1">{wallet.name}</Typography>}
        />
        <ListItemText sx={{
          textAlign: 'end',
          color: getColor()
        }}
          primary={<Typography variant="h6">
            {'$  ' + Math.abs(wallet.balance).toFixed(2)}
          </Typography>}
          secondary={wallet.created.toLocaleDateString()}
        />
      </ListItem>
    </Link>
  )
}
