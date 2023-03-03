import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader, MenuItem, Skeleton, styled, TextField, Typography } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SkeletonInput from '../components/skeletons/SkeletonInput'
import { CategoryList, CategoryListIcons } from '../models/CategoryModel'
import WalletModel, { initialWallet } from '../models/WalletModel'
import { addNewOwner, createWallet, deleteWallet, getOwnersOfList, getWallet, updateWallet } from '../tools/firebase.functions'
import useAuth from '../tools/useAuth'
import { Add, Close } from '@mui/icons-material'
import ProfileModel from '../models/ProfileModel'

const InputWallet = styled(TextField)({
  marginTop: 12
})

const Wallet: React.FC<{}> = () => {
  const { user, firestore } = useAuth()

  const navigate = useNavigate()
  const { _id } = useParams()
  const [wallet, setWallet] = useState<WalletModel>({
    ...initialWallet,
    _creator: user?.uid ?? '',
    owners: [user?.uid ?? '']
  })
  const [profilesOwners, setProfilesOwners] = useState<ProfileModel[]>([])
  const [newOwner, setOwner] = useState('')

  const refInputAmount = useRef<HTMLInputElement>(null!)

  const getOwners = useCallback(function () {
    getOwnersOfList(wallet.owners, firestore)
      .then(r => setProfilesOwners(r))
      .catch(e => alert(e))
  }, [wallet])

  function saveNewOwner (): void {
    addNewOwner(wallet, newOwner, firestore).then(r => {
      setWallet(p => ({
        ...p,
        owners: [...p.owners, r._id]
      }))
      setProfilesOwners(p => [...p, r])
    })
      .catch(e => alert(e))
  }

  useEffect(() => {
    if (_id) {
      if (_id === 'new') {
        setWallet(p => ({
          ...p,
          _id: 'new'
        }))
      } else {
        getWallet(_id, firestore)
          .then(_w => {
            setWallet(_w)
            getOwners()
          })
          .catch(e => console.error(e))
      }
    } else navigate('/', { replace: true })
  }, [_id, firestore, navigate])

  function changeWallet (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | {
    target: {
      name: string
      value: string
    }
  }): void {
    // console.log('event: ', e)
    console.log(e.target.name, ': ', e.target.value)
    let {
      name,
      value
    } = e.target
    value = parseValue(name as keyof WalletModel, value)
    setWallet(p => ({
      ...p,
      [name]: value
    }))
  }

  function parseValue (name: keyof WalletModel, value: string): any {
    switch (name) {
      case 'name':
        return value
      case 'balance':
        if (value === 'Backspace') { return parseFloat((Math.trunc(wallet.balance * 10) / 100).toFixed(2)) }
        return parseFloat(value) || value === '0' ? wallet.balance * 10 + parseFloat(value) / 100 : wallet.balance

      default:
        break
    }
  }

  function save (): void {
    if (_id === 'new') {
      createWallet(wallet, firestore).then(r => {
        navigate(-1)
      }).catch(e => {
        console.error('Save Wallet:', e)
      })
    } else {
      updateWallet(wallet, firestore).then(r => {
        navigate(-1)
      }).catch(e => {
        console.error('Update Wallet:', e)
      })
    }
    // console.error("Guardar en la base de datos no implementado");
  }

  function remove (): void {
    if (_id === 'new') {
      throw new Error('Falta implementar.')
    } else {
      deleteWallet(wallet, firestore).then(r => {
        navigate(-1)
      }).catch(e => {
        console.error('Update Wallet:', e)
      })
    }
    // console.error("Guardar en la base de datos no implementado");
  }

  function onClose (): void {
    navigate(-1)
  }

  return (
    <Dialog fullWidth={true} maxWidth='xs' open={true} onClose={onClose}>
      <DialogTitle>
        {!wallet._id ? 'Cargando' : wallet._id === 'new' ? 'Nueva Cuenta' : 'Editar Cuenta'}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      {!wallet._id
        ? <DialogContent>
          <SkeletonInput />
          <SkeletonInput />
        </DialogContent>
        : <DialogContent>
          <InputWallet
            fullWidth onChange={changeWallet} name='name' value={wallet.name} placeholder="Nombre" label="Nombre" type="text" />
          <InputWallet
            fullWidth name='balance' value={wallet.balance.toFixed(2)} placeholder="Monto" label="Monto" type="text"
            onFocus={e => {
              const { length } = refInputAmount.current.value
              refInputAmount.current.setSelectionRange(length, length)
              refInputAmount.current.focus()
            }}
            onClick={e => {
              const { length } = refInputAmount.current.value
              refInputAmount.current.setSelectionRange(length, length)
              refInputAmount.current.focus()
            }}
            onKeyDown={e => {
              if (e.key !== 'Tab' && e.key !== 'Enter') { e.preventDefault() }
              changeWallet({
                target: {
                  name: 'balance',
                  value: e.key
                }
              })
            }}
            inputProps={{
              ref: refInputAmount,
              inputMode: 'decimal',
              // pattern: '[0-9]*',
              pattern: '[0-9]*',
              dataReverse: true,
              sx: {
                textAlign: 'right'
              }
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>
            }} />
          <List dense
            // sx={{ pb: 4 }}
            subheader={
              <ListSubheader sx={{ pl: 0 }} component="div" id="list-owners">
                Lista de colaboradores
              </ListSubheader>
            }
          >
            {profilesOwners.map(profile => (
              <ListItem sx={{ alignItems: "baseline" }} disablePadding key={`profile:${profile._id}`}>
                {profile.displayName}
                {profile._id === wallet._creator && (<Typography sx={{ pl: 2, color: 'gray' }} variant='caption'>Creador</Typography>)}
              </ListItem>
            ))}
            <ListItem
              secondaryAction={
                <IconButton onClick={saveNewOwner} edge="end" aria-label="comments">
                  <Add />
                </IconButton>
              }
              key="profile:new"
              disablePadding
            >
              <InputWallet
                variant='standard'
                sx={{ mt: 0 }}
                fullWidth onChange={e => setOwner(e.target.value.trim())} name='new-owner' value={newOwner} placeholder="Nuevo colaborador/a" label="Nuevo colaborador/a" type="text"
              />
            </ListItem>
          </List>
        </DialogContent>
      }
      <DialogActions>
        {_id !== 'new' && (
          <Button fullWidth variant="text" color='secondary' onClick={remove}>
            Eliminar
          </Button>
        )}
        <Button fullWidth variant="contained" disabled={!wallet._id} onClick={save}>
          {!wallet._id ? '...' : wallet._id === 'new' ? 'Crear' : 'Guardar'}
        </Button>
      </DialogActions>
    </Dialog >
  )
}

export default Wallet
