import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { Link as LinkDom, useNavigate, useLocation } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'

import { Google } from '@mui/icons-material'
import useAuth from '../tools/useAuth'
import { Link } from '@mui/material'

function Copyright (props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function SignIn () {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()

  const from = (location.state)?.from?.pathname || '/'

  function handleSubmit () {
    console.log('handleSubmit')
    auth.signInGoogle().then(() => {
      console.log('Registred')
      // navigate(from, { replace: true });
    }).catch((e: any) => {
      console.log('Registred ERROR')
      console.log(e)
      alert(e)
    })
  }

  return (
    <Grid
      container
      component="main"
      alignItems="stretch"
      sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          opacity: 0,
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        component={Paper}
        elevation={6}
        square>
        <Box
          sx={{
            my: 'auto',
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
            // height: '100vh'
          }}
        >
          <Typography component="h3" variant="h3">
            Bienvenid@
          </Typography>
          <Avatar sx={{ m: 3, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h5" variant="h5">
            Iniciar Sesión
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Typography sx={{ textAlign: 'center', mt: 5 }} variant='body1'>
              Esta aplicación solo puede usarse con la cuenta institucional correspondiente.
            </Typography>
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                borderRadius: 6
              }}
            >
              Ingresar con Google
            </Button>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
