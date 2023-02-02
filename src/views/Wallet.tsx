import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, InputAdornment, List, ListItemIcon, ListItemText, MenuItem, Skeleton, styled, TextField } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SkeletonInput from '../components/skeletons/SkeletonInput'
import { CategoryList, CategoryListIcons } from '../models/CategoryModel'
import WalletModel, { initialWallet } from '../models/WalletModel'
import { createWallet } from '../tools/firebase.functions'
import useAuth from '../tools/useAuth'

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
  const refInputAmount = useRef<HTMLInputElement>(null!)

  useEffect(() => {
    if (_id === 'new') {
      setWallet(p => ({
        ...p,
        _id: 'new'
      }))
    } else console.error('Cargar desde la base de datos no implementado')
  }, [_id])

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
    createWallet(wallet, firestore).then(r => {
      navigate(-1)
    }).catch(e => {
      console.error('Save Wallet:', e)
    })
    // console.error("Guardar en la base de datos no implementado");
  }

  return (
    <Dialog fullWidth={true} maxWidth='xs' open={true} onClose={e => navigate(-1)}>
      <DialogTitle>
        {!wallet._id ? 'Cargando' : wallet._id === 'new' ? 'Nueva Cuenta' : 'Editar Cuenta'}
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
        </DialogContent>
      }
      <DialogActions>
        <Button fullWidth variant="text" color='secondary' onClick={e => navigate(-1)}>
          Cancelar
        </Button>
        <Button fullWidth variant="contained" disabled={!wallet._id} onClick={save}>
          {!wallet._id ? '...' : wallet._id === 'new' ? 'Crear' : 'Guardar'}
        </Button>
      </DialogActions>
    </Dialog >
  )
}

export default Wallet
