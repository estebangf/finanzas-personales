import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, FormGroup, InputAdornment, List, ListItemIcon, ListItemText, MenuItem, Skeleton, styled, Switch, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AmountSwitch from "../components/AmountSwitch";
import SkeletonInput from "../components/skeletons/SkeletonInput";
import { CategoryList, CategoryListIcons } from "../models/CategoryModel";
import MovementModel, { initialMovement } from "../models/MovementModel";
import { createMovement, getMovement, updateMovement } from "../tools/firebase.functions";
import useAuth from "../tools/useAuth";
import useWallets from "../tools/useWallets";

const InputMovement = styled(TextField)({
  marginTop: 12
})

interface MovementProps {
  // movement: MovementModel
}
export default function Movement({ }: MovementProps) {
  const navigate = useNavigate();
  const { user, firestore } = useAuth()
  const { walletSelected } = useWallets()

  const { _id } = useParams()
  const [isPositive, setIsPositive] = useState(false)
  const [movement, setMovement] = useState<MovementModel>({
    ...initialMovement,
    date: new Date(),
    _creator: user?.uid || '',
    _wallet: walletSelected?._id || ''
  })
  const refInputAmount = useRef<HTMLInputElement>(null!)

  useEffect(() => {
    if (_id)
      if (_id === "new") setMovement(p => ({
        ...p,
        _id: 'new'
      }));
      else getMovement(_id, firestore).then(_m => {
        setMovement(_m)
        setIsPositive(_m.amount > 0)
      });
    else navigate('/', { replace: true })
  }, [_id, firestore, navigate])


  function changeMovement(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    // console.log('event: ', e)
    console.log(e.target.name, ": ", e.target.value)
    let {
      name,
      value
    } = e.target
    value = parseValue(name as keyof MovementModel, value)
    setMovement(p => ({
      ...p,
      [name]: value
    }))
  }

  function parseValue(name: keyof MovementModel, value: string): any {
    switch (name) {
      case 'date':
        /*
        // let values = value.split('T');
        // let valuesD = values[0].split('-');
        // let valuesT = values[1].split(':');
        // let
        //   year: number = parseInt(valuesD[0]),
        //   monthIndex: number = parseInt(valuesD[1]),
        //   date: number = parseInt(valuesD[2]),
        //   hours: number = parseInt(valuesT[0]),
        //   minutes: number = parseInt(valuesT[1])
*/
        return new Date(value)
      case 'amount':
        let amount = movement.amount;
        if (value === 'Backspace')
          amount = parseFloat((Math.trunc(amount * 10) / 100).toFixed(2));
        amount = parseFloat(value) || value === '0' ?
          amount * 10 + (parseFloat(value) * (Math.sign(amount) || 1)) / 100 :
          amount;
        return isPositive ? Math.abs(amount) : Math.abs(amount) * -1;
      case 'category':
        return value;

      default:
        break;
    }
  }

  function dateFromInput(_date: Date) {
    let fullYear = _date.getFullYear(),
      month = _date.getMonth(),
      date = _date.getDate(),
      hours = _date.getHours(),
      minutes = _date.getMinutes();

    return `${fullYear}-${month < 10 ? "0" : ''}${month}-${date < 10 ? "0" : ''}${date}T${hours < 10 ? "0" : ''}${hours}:${minutes < 10 ? "0" : ''}${minutes}`
  }


  function save() {
    if (_id === 'new')
      createMovement(movement, firestore).then(r => {
        navigate(-1)
      }).catch(e => {
        console.error("Save Movement:", e)
      })
    else
      updateMovement(movement, firestore).then(r => {
        navigate(-1)
      }).catch(e => {
        console.error("Update Movement:", e)
      })
    // console.error("Guardar en la base de datos no implementado");
  }

  useEffect(() => {
    setMovement(p => ({
      ...p,
      amount: isPositive ? Math.abs(p.amount) : Math.abs(p.amount) * -1
    }))
  }, [isPositive])


  return (
    <Dialog fullWidth={true} maxWidth='xs' open={true} onClose={e => navigate(-1)}>
      <DialogTitle sx={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        {!movement._id ? "Cargando" :
          (movement._id === 'new' ? "Nuevo " : "Editar ") +
          (isPositive ? "ingreso" : "egreso")
        }
        <AmountSwitch
          checked={isPositive}
          onChange={() => setIsPositive(p => !p)}
        />
      </DialogTitle>
      {!movement._id ?
        <DialogContent>
          <SkeletonInput />
          <SkeletonInput />
          <SkeletonInput />
        </DialogContent>
        :
        <DialogContent>
          <InputMovement
            fullWidth onChange={changeMovement} name='date' value={dateFromInput(movement.date)} placeholder="Fecha" label="Fecha" type="datetime-local" />
          <InputMovement
            fullWidth name='amount' value={movement.amount.toFixed(2)} placeholder="Monto" label="Monto" type="text"
            onFocus={e => {
              let { length } = refInputAmount.current.value
              refInputAmount.current.setSelectionRange(length, length)
              refInputAmount.current.focus()
            }}
            onClick={e => {
              let { length } = refInputAmount.current.value
              refInputAmount.current.setSelectionRange(length, length)
              refInputAmount.current.focus()
            }}
            onKeyDown={e => {
              if (e.key !== 'Tab' && e.key !== 'Enter')
                e.preventDefault()
              changeMovement({
                target: {
                  name: "amount",
                  value: e.key
                }
              } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
            }}
            inputProps={{
              ref: refInputAmount,
              inputMode: 'decimal',
              // pattern: '[0-9]*',
              pattern: "[0-9]*",
              dataReverse: true,
              sx: {
                textAlign: 'right'
              }
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>
            }} />
          <InputMovement
            fullWidth select name='category' value={movement.category} placeholder="Categoria" label="Categoria" type="text"
            onChange={changeMovement}
            inputProps={{
              sx: {
                display: 'flex'
              }
            }}
          >
            {CategoryList.map(({ superior, lowers }) => {
              let IconCategorySuperior = CategoryListIcons[superior];
              return [
                <MenuItem key={superior} value={superior}>
                  <ListItemIcon>
                    <IconCategorySuperior />
                  </ListItemIcon>
                  <ListItemText>
                    {superior}
                  </ListItemText>
                </MenuItem>,
                lowers.map((lower) => {
                  let IconCategoryLower = CategoryListIcons[lower];
                  return (
                    <MenuItem sx={{
                      pl: 4
                    }} key={lower} value={lower}>
                      <ListItemIcon>
                        <IconCategoryLower />
                      </ListItemIcon>
                      <ListItemText>
                        {lower}
                      </ListItemText>
                    </MenuItem>
                  )
                })
              ]
            })}
          </InputMovement>
        </DialogContent>
      }
      <DialogActions>
        <Button fullWidth variant="text" color='secondary' onClick={e => navigate(-1)}>
          Cancelar
        </Button>
        <Button fullWidth variant="contained" disabled={!movement._id} onClick={save}>
          {!movement._id ? "..." : movement._id === 'new' ? "Crear" : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog >
  )
}