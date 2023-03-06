import { MenuItem, ListItemIcon, ListItemText, Avatar } from "@mui/material"
import { CategoryListIcons, CategoryLower, CategorySuperior } from "../models/CategoryModel"

interface CategoryProps {
  name: CategorySuperior | CategoryLower
  // isLower?: boolean
}

const CategoryItem: React.FC<CategoryProps> = ({ name }) => {
  const icon = CategoryListIcons[name]

  return (
    // <MenuItem sx={{
    //   pl: isLower ? 4 : 0
    // }} key={name} value={name}>
    <>
      <ListItemIcon>
        <Avatar src={`/icons/${icon}.png`} />
      </ListItemIcon>
      <ListItemText>
        {name}
      </ListItemText>
    </>
    // </MenuItem>
  )
}

export default CategoryItem
