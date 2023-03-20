import { Restore, Favorite, LocationOn } from '@mui/icons-material'
import { Avatar, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { StringDecoder } from 'string_decoder'

const BottomBarApp: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  console.log('location', location.pathname)
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        sx={{ bgcolor: '#f1f1f1' }}
        showLabels
        value={location.pathname}
        onChange={(event, newValue) => {
          navigate(newValue)
        }}
      >
        <BottomNavigationAction
          value='/wallets' label="Cuentas"
          icon={<Avatar sx={{ width: 32, height: 32 }} src='/icons/icon (1).png' />} />
        <BottomNavigationAction
          value='/movements' label="Movimientos"
          icon={<Avatar sx={{ width: 32, height: 32 }} src='/icons/icon (2).png' />} />
        <BottomNavigationAction
          disabled
          value='/credits' label="Creditos"
          icon={<Avatar sx={{ width: 32, height: 32 }} src='/icons/icon (3).png' />} />
        <BottomNavigationAction
          value='/graphics' label="Graficos"
          icon={<Avatar sx={{ width: 32, height: 32 }} src='/icons/icon (4).png' />} />
      </BottomNavigation>
    </Paper >
  )
}

export default BottomBarApp
