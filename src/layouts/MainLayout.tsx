import { Outlet } from 'react-router-dom'
import ToolBarApp from '../components/ToolBarApp'
import Box from '@mui/material/Box'
import BottomBarApp from '../components/BottomBarApp'

const MainLayout: React.FC<{}> = () => {
  return (
    <div style={{
      // display: 'flex',
      backgroundColor: '#ffffffa1',
      minHeight: '-webkit-fill-available'
    }}>
      <ToolBarApp />
      <Box sx={{
        width: '100%'
      }}>
        <Box sx={{
          m: 3,
          // p: 2,
          position: 'relative'
        }}>
          <Outlet />
        </Box>
      </Box>
      <BottomBarApp />
    </div>
  )
}

export default MainLayout
