import { Add } from "@mui/icons-material"
import { Color, Fab, FabPropsColorOverrides, PropTypes, Zoom } from "@mui/material"
import { Link } from "react-router-dom"

interface AddButtonProps {
  label: string
  color: PropTypes.Color | "success" | "error" | "info" | "warning"
}

const AddButton: React.FC<AddButtonProps> = ({ label, color }) => {
  return (
    <Zoom
      in={true}
      unmountOnExit
    >
      <Link to='new'>
        <Fab sx={{
          position: 'fixed',
          bottom: 66,
          right: 16
        }} aria-label={`new-${label}`} color={color}>
          <Add />
        </Fab>
      </Link>
    </Zoom>
  )
}

export default AddButton
