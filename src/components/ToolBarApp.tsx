import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { useLocation } from 'react-router-dom';
import { Badge, Divider, Menu, MenuItem } from '@mui/material';
import { useScrollPosition } from '../tools/useScrollPosition';
import AuthStatus from './auth/AuthStatus';
import AppMenu from './AppMenu';
import useWallets from '../tools/useWallets';
import useAuth from '../tools/useAuth';

const onTopTheme = createTheme({
  // palette: {
  //   mode: 'light',
  //   primary: {
  //     main: '#ffffff00',
  //   },
  // },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          width: "-webkit-fill-available",
          top: 12,
          borderRadius: 12,
          padding: 4,
          margin: 12,
          marginTop: 0,
          zIndex: 1100,
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          // transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          boxShadow: "none",
          // boxShadow: "rgb(0 0 0 / 3%) 0rem 0.25rem 0.6875rem 0rem",
          backdropFilter: "none",
          color: "rgb(123, 128, 154)",
          backgroundColor: "transparent",
          // backgroundColor: "#ffffff26"
        }
      }
    }
  }
});


const scrollingTheme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          width: "-webkit-fill-available",
          top: 12,
          borderRadius: 12,
          padding: 4,
          margin: 12,
          marginTop: 0,
          zIndex: 1100,
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          // transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          boxSizing: "border-box",
          boxShadow: "rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem",
          backdropFilter: "saturate(200%) blur(1.875rem)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          color: "rgb(52, 71, 103)",
        }
      }
    }
  }
});

interface AppBarStyledProps {
  openDrawerDesktop: boolean
}
function ToolBarApp({ openDrawerDesktop }: AppBarStyledProps) {
  const { title } = useAuth()
  const { walletSelected } = useWallets()

  const [scrolling, setScrolling] = useState(false);
  const scrollTop = 60;
  const scrollPosition = useScrollPosition();

  useEffect(() => {
    setScrolling(scrollPosition > scrollTop)
    // console.log(scrolling, " ", scrollPosition)
  }, [scrollPosition]);

  return (
    <ThemeProvider theme={scrolling ? scrollingTheme : onTopTheme}>
      <AppBar position='sticky' color="primary">
        <Toolbar>
          <AppMenu />
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {title} {walletSelected && walletSelected.name === title ? 
            `$ ${walletSelected.balance.toFixed(2)}` : ''}
          </Typography>
          <AuthStatus />
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default ToolBarApp;