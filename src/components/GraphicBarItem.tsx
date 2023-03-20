import { Error, VisibilityOff } from '@mui/icons-material'
import { Avatar, Box, Hidden, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import CategoryModel, { CategoryListIcons } from '../models/CategoryModel'
import MovementModel from '../models/MovementModel'

interface GraphicBarItemProps {
  category: CategoryModel
  val: number
  percentage: number
  color: string
  handleHidel: () => void
}
const GraphicBarItem: React.FC<GraphicBarItemProps> = ({ category, val, color, percentage, handleHidel }) => {
  const icon = CategoryListIcons[category] || Error

  return (
    <ListItem sx={{
      // bgcolor: '#FFFFFF',
      borderRadius: 2,
      pl: 0,
      mb: 2
      // boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px'
    }}>
      <ListItemAvatar sx={{
        mr: -2,
        marginTop: 'auto'
      }}>
        <Avatar src={`/icons/${icon}.png`}
          sx={{
            bgcolor: '#fff',
            width: 48,
            height: 48,
            mr: -2,
            boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
            color: '#FFFFFF'
          }}>
          {/* <Icon /> */}
        </Avatar>
      </ListItemAvatar>
      <Box sx={{
        width: 'calc(100% - 72px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch'
      }}>
        <ListItemText
          primary={
            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              pl: 2,
              width: '100%'
            }}>
              <Typography
                sx={{
                  textAlign: 'start',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }} variant="subtitle1">{category}</Typography>
              <Typography
                sx={{
                  textAlign: 'end',
                  whiteSpace: 'nowrap'
                }} variant="subtitle1">
                {'$  ' + Math.abs(val).toFixed(2)}
              </Typography>
            </Box>
          }
        />
        <Paper sx={{
          bgcolor: color,
          mr: `${100 - percentage}%`,
          pt: 1,
          // mt: 1,
          mb: 1
        }}>
        </Paper>
      </Box>
      <ListItemSecondaryAction>
        <IconButton onClick={handleHidel}>
          <VisibilityOff />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default GraphicBarItem
