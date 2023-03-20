import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts'
import { ThemeProvider } from '@emotion/react'
import { Box, CircularProgress, createTheme, Dialog, LinearProgress } from '@mui/material'
import Movements from './views/Movements'
import RequireAuth from './components/auth/RequireAuth'
import SignIn from './views/SignIn'
import useAuth from './tools/useAuth'
import Movement from './views/Movement'
import WalletsProvider from './features/WalletsProvider'
import MovementsProvider from './features/MovementsProvider'
import Wallets from './views/Wallets'
import Wallet from './views/Wallet'
import LoadingPage from './views/LoadingPage'
import CreditsProvider from './features/CreditsProvider'
import Credits from './views/Credits'
import Graphics from './views/Graphics'

const lightTheme = createTheme({
  palette: {
    mode: 'light'
    // primary: {
    //   light: '#ffc889',
    //   main: '#7b4b27',
    //   dark: '#251004',
    //   contrastText: '#ffc786',
    // },
    // secondary?: PaletteColorOptions;
    // error?: PaletteColorOptions;
    // warning?: PaletteColorOptions;
    // info?: PaletteColorOptions;
    // success?: PaletteColorOptions;
    // mode?: PaletteMode;
    // tonalOffset?: PaletteTonalOffset;
    // contrastThreshold?: number;
    // common?: Partial<CommonColors>;
    // grey?: ColorPartial;
    // text?: Partial<TypeText>;
    // divider?: string;
    // action?: Partial<TypeAction>;
    // background: {
    //   paper: '#ffc889',
    // }
    // getContrastText?: (background: string) => string;
  }
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2'
    }
  }
})

// interface AppPrps { }
// const App: React.FC<AppPrps> = () => {
const App: React.FC = () => {
  const auth = useAuth()

  return (
    <div className={(auth.user != null) ? 'App-logued' : 'App'}>
      <ThemeProvider theme={lightTheme}>
        {auth.initialized
          ? <BrowserRouter>
            <Routes>
              <Route path="" element={<RequireAuth required={true}><WalletsProvider><MainLayout /></WalletsProvider></RequireAuth>}>
                <Route path="" element={<LoadingPage />} />
                <Route path="wallets" element={<Wallets />}>
                  <Route path=":_id" element={<Wallet />} />
                </Route>
                <Route path="movements" element={<MovementsProvider><Movements /></MovementsProvider>}>
                  <Route path=":_id" element={<Movement />} />
                </Route>
                <Route path="credits" element={<CreditsProvider><Credits /></CreditsProvider>}>
                  {/* <Route path=":_id" element={<Credit />} /> */}
                </Route>
                <Route path="graphics" element={<MovementsProvider><Graphics /></MovementsProvider>}>
                  {/* <Route path=":_id" element={<Movement />} /> */}
                </Route>
                <Route path="Como usar" element={<div>Como usar</div>} />
                <Route path="profile" element={<div>Perfil</div>} />
                <Route path="settings" element={<div>Opciones</div>} />
              </Route>
              <Route path="about" element={<div>Acerca de</div>} />

              <Route path="signin" element={<RequireAuth required={false} exclud={true}><SignIn /></RequireAuth>} />
            </Routes>
          </BrowserRouter>
          : <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}
          >
            <img src='logo96.png' alt="Cargando..." />
            <LinearProgress sx={{
              position: 'fixed',
              bottom: 48,
              width: 200,
              marginTop: 2,
              height: 8
            }} />
          </Box>
        }
      </ThemeProvider>
    </div >
  )
}

export default App
