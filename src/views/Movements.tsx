import { Add } from '@mui/icons-material'
import { Box, Fab, List, Zoom } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import MovementItem from '../components/MovementItem'
import { CategoryList } from '../models/CategoryModel'
import { MovementsModel } from '../models/MovementModel'
import { getComparator } from '../tools/getComparator'
import useAuth from '../tools/useAuth'
import useMovements from '../tools/useMovements'
import useWallets from '../tools/useWallets'

function Movements () {
  // useAuth().setTitle("Lista de movimientos");
  useAuth().setTitle(useWallets().walletSelected?.name || 'Cargando cuenta')
  const { movements } = useMovements()
  const { walletSelected } = useWallets()

  if (walletSelected == null) { return <Navigate to='/wallets' replace /> } else {
    return (
    <Box sx={{
      // bgcolor: "#ffffffa1"
      pb: 8
    }}>
      <List>
        {movements.map(movement => <MovementItem movement={movement} />)}
      </List>
      <Zoom
        in={true}
        unmountOnExit
      >
        <Link to='new'>
          <Fab sx={{
            position: 'fixed',
            bottom: 16,
            right: 16
          }} aria-label={'new-movement'} color='primary'>
            <Add />
          </Fab>
        </Link>
      </Zoom>
      <Outlet />
    </Box>
    )
  }
}

export default Movements
