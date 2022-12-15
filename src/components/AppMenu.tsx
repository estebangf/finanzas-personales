import { KeyboardArrowDown, Menu } from '@mui/icons-material'
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material'
import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { menuOptions, menuPersonalOptions } from '../values/OptionMenuListValue'

const MenuList = styled(List)<{ component?: React.ElementType }>({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20
  }
})

function AppMenu () {
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)
  const [openListExtra, setOpenListExtra] = useState(true)

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setIsOpen(open)
  }

  return (
    <Fragment>
      <IconButton onClick={toggleDrawer(true)} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <Menu />
      </IconButton>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          role="presentation"
          // onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <MenuList sx={{
            paddingTop: 0,
            paddingBottom: 0
          }}>
            <ListItemButton component="a" sx={{ paddingTop: 2 }}>
              <ListItemIcon sx={{ fontSize: 20 }}>💰</ListItemIcon>
              <ListItemText
                sx={{ my: 0 }}
                primary="Finanzas Personales"
                primaryTypographyProps={{
                  fontSize: 20,
                  fontWeight: 'medium',
                  letterSpacing: 0
                }}
              />
            </ListItemButton>
            <Divider />
            {menuOptions.map((menu, index) => (
              <ListItem key={menu.label} disablePadding onClick={(e) => {
                toggleDrawer(false)(e)
                navigate(menu.link)
              }}>
                <ListItemButton component="a">
                  <ListItemIcon sx={{ fontSize: 20 }}>
                    <menu.icon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={menu.label}
                    primaryTypographyProps={{
                      color: 'primary',
                      fontWeight: 'medium',
                      variant: 'body2'
                    }} />
                </ListItemButton>
              </ListItem>
            ))}
            <Divider />
            <Box
              sx={{
                // maxWidth: 250,
                width: 'auto',
                bgcolor: openListExtra ? '#47628217' : null,
                pb: openListExtra ? 2 : 0
              }}
            >
              <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpenListExtra(!openListExtra)}
                sx={{
                  px: 3,
                  pt: 2.5,
                  pb: openListExtra ? 0 : 2.5,
                  '&:hover, &:focus': { '& svg': { opacity: openListExtra ? 1 : 0 } }
                }}
              >
                <ListItemText
                  primary="Configuración Personal"
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: 'medium',
                    lineHeight: '20px',
                    mb: '2px'
                  }}
                  secondary={menuPersonalOptions.map((menu) => `${menu.label}, `)}
                  secondaryTypographyProps={{
                    noWrap: true,
                    fontSize: 12,
                    lineHeight: '16px',
                    color: openListExtra ? 'rgba(0,0,0,0)' : '#000000bf'
                  }}
                  sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                  sx={{
                    mr: -1,
                    opacity: 0,
                    transform: openListExtra ? 'rotate(-180deg)' : 'rotate(0)',
                    transition: '0.2s'
                  }}
                />
              </ListItemButton>
              {openListExtra &&
                menuPersonalOptions.map((menu) => (
                  <ListItemButton
                    key={menu.label}
                    sx={{ py: 0, minHeight: 32, color: '#000000bf' }}
                  >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      <menu.icon />
                    </ListItemIcon>
                    <ListItemText
                      primary={menu.label}
                      primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                    />
                  </ListItemButton>
                ))}
            </Box>
          </MenuList>
        </Box>
      </Drawer>
    </Fragment>
  )
}

export default AppMenu
