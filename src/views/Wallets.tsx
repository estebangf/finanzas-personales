import { Add } from "@mui/icons-material";
import { Box, Fab, List, Paper, Typography, Zoom } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import WalletItem from "../components/WalletItem";
import { CategoryList } from "../models/CategoryModel";
import { WalletsModel } from "../models/WalletModel";
import { createWallet } from "../tools/firebase.functions";
import { getComparator } from "../tools/getComparator";
import useAuth from "../tools/useAuth";
import useWallets from "../tools/useWallets";

function Wallets() {
  useAuth().setTitle("Billetera");
  const { wallets } = useWallets()

  return (
    <Box sx={{
      // bgcolor: "#ffffffa1"
      pb: 8
    }}>
      {wallets.length ?
        <List>
          {wallets.map(wallet => <WalletItem wallet={wallet} />)}
        </List>
        :
        <Paper elevation={4} sx={{
          margin: '50% 0px',
          padding: 4
        }}>
          <Typography sx={{
            textAlign: 'center',
            color: '#00000099'
          }} variant="subtitle1">
            No tienes ninguna cuenta creada,
            crea una para empezar a controlar tus movimientos
          </Typography>
        </Paper>
      }
      <Zoom
        in={true}
        unmountOnExit
      >
        <Link to='new'>
          <Fab sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
          }} aria-label={'new-wallet'} color='primary'>
            <Add />
          </Fab>
        </Link>
      </Zoom>
      <Outlet />
    </Box>
  )
}

export default Wallets;