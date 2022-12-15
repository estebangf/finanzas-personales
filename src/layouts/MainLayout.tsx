import { Outlet } from "react-router-dom";
import ToolBarApp from "../components/ToolBarApp";
import Box from "@mui/material/Box";

function MainLayout() {
  return (
    <div style={{
      // display: 'flex',
      backgroundColor: "#ffffffa1",
      minHeight: '-webkit-fill-available'
    }}>
      <ToolBarApp openDrawerDesktop={false} />
      <Box sx={{
        width: "100%",
      }}>
        <Box sx={{
          m: 3,
          // p: 2,
          position: 'relative'
        }}>
          <Outlet />
        </Box>
      </Box>
    </div>
  );
}

export default MainLayout;