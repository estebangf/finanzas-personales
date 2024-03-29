import { Fragment, useState, MouseEvent } from 'react'
import { Person, Settings, Logout } from '@mui/icons-material'
import { Box, Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import { Link as LinkDom } from 'react-router-dom'
import useAuth from '../../tools/useAuth'

const AuthStatus: React.FC<{}> = () => {
  const auth = useAuth()
  // let navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (): void => {
    setAnchorEl(null)
  }

  if (auth.user == null) {
    return <LinkDom to="/signin">
      <IconButton
        size="small"
      >
        <Avatar
          src="https://www.gstatic.com/images/branding/product/1x/contacts_48dp.png"
        />
      </IconButton>
    </LinkDom>
  }

  function signout (): void {
    auth.signout()
      .then(r => console.log(r))
      .catch(e => console.error(e))
  }

  return (
    <Fragment>
      <Box sx={{
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              alt={`${auth.user.displayName ?? 'none Display Name'}`}
              src={auth.user.photoURL ? auth.user.photoURL : 'https://www.gstatic.com/images/branding/product/1x/contacts_48dp.png'}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            // width: 320,
            maxWidth: '100%',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 20,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{
          padding: 3,
          textAlign: 'center'
        }}
        >
          <Typography variant="subtitle2">Bienvenid@</Typography>
          <Typography variant="subtitle1"><b>{auth.user.displayName}</b></Typography>
          <Typography variant="caption">{auth.user.email}</Typography>
        </Box>

        <LinkDom to="/account">
          <MenuItem>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            Account
          </MenuItem>
        </LinkDom>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={signout}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Fragment >
  )
}
export default AuthStatus
