import { Add } from '@mui/icons-material'
import { Box, Fab, List, Zoom } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { CategoryList } from '../models/CategoryModel'
import { CreditsModel } from '../models/CreditModel'
import { getComparator } from '../tools/getComparator'
import useAuth from '../tools/useAuth'
import useWallets from '../tools/useWallets'
import AddButton from '../components/AddButton'

const Credits: React.FC<{}> = () => {
  useAuth().setTitle(useWallets().walletSelected?.name ?? 'Cargando cuenta')
  // const { credits } = useCredits()
  const { walletSelected } = useWallets()

  if (walletSelected == null) { return <Navigate to='/wallets' replace /> } else {
    return (
      <Box sx={{
        // bgcolor: "#ffffffa1"
        pb: 8
      }}>
        <List>
          {/* {credits.map(credit => <CreditItem credit={credit} />)} */}
        </List>
        <AddButton label='credit' color='primary' />
        <Outlet />
      </Box>
    )
  }
}

export default Credits
