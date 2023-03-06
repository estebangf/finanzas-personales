import { Error } from '@mui/icons-material'
import { Avatar, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { CategoryListIcons } from '../models/CategoryModel'
import MovementModel from '../models/MovementModel'

interface MovemenentProps {
  movement: MovementModel
}
const MovementItem: React.FC<MovemenentProps> = ({ movement }) => {
  const icon = CategoryListIcons[movement.category] || Error
  const getColor = (): string => movement.amount < 0 ? '#ff6b6b' : '#47aeec'

  return (
    <Link to={movement._id} style={{
      color: 'inherit',
      textDecoration: 'none'
    }}>
      <Paper sx={{
        // bgcolor: '#1976d20a'
      }}>
        <ListItem sx={{
          // bgcolor: '#FFFFFF',
          borderRadius: 2,
          mb: 2
          // boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px'
        }}>
          <ListItemAvatar>
            <Avatar src={`/icons/${icon}.png`} sx={{
              // bgcolor: getColor(),
              color: '#FFFFFF'
            }}>
              {/* <Icon /> */}
            </Avatar>
          </ListItemAvatar>
          <ListItemText sx={{
            textAlign: 'start'
          }}
            primary={<Typography variant="subtitle1">{movement.description}</Typography>}
            secondary={<Typography sx={{ color: '#00000099' }} variant="subtitle2">{movement.category}</Typography>}
          />
          <ListItemText sx={{
            textAlign: 'end',
            color: getColor()
          }}
            primary={<Typography variant="subtitle1">
              {'$  ' + Math.abs(movement.amount).toFixed(2)}
            </Typography>}
            secondary={<Typography sx={{ color: '#00000099' }} variant="subtitle2">{movement.date.toLocaleDateString()}</Typography>}
          />
        </ListItem>
      </Paper>
    </Link>
  )
}

export default MovementItem
