import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useStore from "../store/useStore";

const CustomAppBar = () => {
  const { isLoggedIn, logout } = useStore();

  return (
    <AppBar>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "700" }}
        >
          FoodieDelight
        </Typography>
        {isLoggedIn && (
          <>
            <Box
              sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
            >
              <IconButton size="large" edge="end" color="inherit">
                <SearchIcon />
              </IconButton>
              <InputBase
                placeholder="Search..."
                inputProps={{ "aria-label": "search" }}
                sx={{ ml: 1, color: "inherit" }}
              />
              <Button color="inherit" onClick={logout} sx={{ ml: 2 }}>
                Logout
              </Button>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
