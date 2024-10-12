import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../../../Redux/User/UserSlice";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../../Interface/User/UserInterface";
import NotificationComponent from "../../Layout/NotificationComponent";
import { userApi } from "../../../Api/userApi";
import { useSocket } from "../../../Context/SocketContext";

const pages = ["Home", "Courses", "Universities", "Events"];
const pageRoutes: Record<string, string> = {
  Home: "/home",
  Courses: "/courses",
  Universities: "/universities",
  Events: "/events",
}; // Define routes for each page
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

// Define routes for each user menu setting
const settings = [
  { name: "Profile", path: "/profile" },
  { name: "Orders", path: "/orders" },
  // { name: "Dashboard", path: "/dashboard" },
  { name: "Logout", path: "/logout" },
];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const { socket } = useSocket();

  React.useEffect(() => {
    console.log("usefirst");

    const userId = user?.id;
    const getUser = async () => {
      const fetchedUser = await userApi.getAUser(userId);
      if (fetchedUser?.isBlocked) {
        const response = await userApi.signOut();
        if (response) {
          dispatch(signOutUser());
          localStorage.removeItem("refreshToken");
          navigate("/signIn");
        }
      }
    };
    getUser();
  }, [user, navigate]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      const response = await userApi.signOut();
      if (response) {
        socket?.emit("logoutChangeStatus", user?.id, "user");
        dispatch(signOutUser());
        sessionStorage.clear();
        localStorage.removeItem("refreshToken");
        navigate("/signIn");
        handleCloseUserMenu();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    navigate("/");
  };

  // Conditionally include "Home" in the navigation pages if the user is logged in
  const userPages = user ? ["Home", ...pages] : pages;

  return (
    <AppBar className="!bg-cyan-500" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            onClick={handleClick}
          >
            SeC
          </Typography>
          <div className="float-left"></div>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {userPages.map((page, index) => (
                <MenuItem key={page + index}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(pageRoutes[page]); // Navigate to the specific route
                  }}
                  >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}

          <Typography
            variant="h5"
            noWrap
            component="a"
            // href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SeC
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  handleCloseNavMenu();
                  navigate(pageRoutes[page]); // Navigate to the specific route
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {!user ? (
            <>
              <Link to={"/signIn"}>
                <Button
                  className="!bg-white !w-28 !text-black !rounded-full p-3 uppercase mt-2 hover:opacity-90 !mr-5  "
                  variant="text"
                >
                  Login
                </Button>
              </Link>
              <Link to={"/signUp"}>
                <Button
                  className="!bg-cyan-700 !w-28 !text-white !rounded-full p-3 uppercase mt-2 hover:opacity-90 !mr-5  "
                  variant="text"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <Box sx={{ flexGrow: 0, display: "flex" }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src={user.image} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.name}
                    onClick={() => {
                      handleCloseUserMenu();
                      if (setting.name === "Logout") {
                        handleLogout();
                      } else {
                        navigate(setting.path); // Navigate to the specific route
                      }
                    }}
                  >
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
              <NotificationComponent role="user" />
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
