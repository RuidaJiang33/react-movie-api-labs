import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { AuthContext } from "../../contexts/authContext";
//import { useLocation } from "react-router-dom";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  //const location = useLocation();

  const open = Boolean(anchorEl);

  // const hideSiteHeader = location.pathname === '/' || location.pathname === '/signup';

  // if (hideSiteHeader) {
  //   return <></>;
  // }

  const handleMenuSelect = (pageURL) => {
    navigate(pageURL, { replace: true });
  };

  const handleMenuOpen = (event, buttonId, options) => {
    setAnchorEl(event.currentTarget);
    setActiveButton(buttonId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActiveButton(null);
  };

  const handleLogOut = () => {

    navigate('/');
  }

  const moviesOptions = [
    { label: "Home", path: "/home" },
    { label: "UpComing", path: "/movies/upcoming" },
    { label: "TopRated", path: "/movies/topRated" },
  ];

  const peopleOptions = [
    { label: "Popular", path: "/people/page/1" },
  ];

  const userOptions = [
    { label: "Favorites", path: "/movies/favorites" },
    { label: "MustWatches", path: "/movies/mustWatch" },
  ];

  const menuItems = [
    { label: "Movies", id: "movies_button", options: moviesOptions },
    { label: "People", id: "people_button", options: peopleOptions },
    { label: "User", id: "user_button", options: userOptions },
  ];


  return context.isAuthenticated ? (
    <>
      <AppBar position="fixed" style={{ backgroundColor: '#0D253F' }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            All you ever wanted to know about Movies!
          </Typography>

          {menuItems.map((item) => (
            <Button
              id={item.id}
              aria-controls={activeButton === item.id ? 'menu-' + item.id : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              key={item.label}
              color="inherit"
              onClick={(event) => handleMenuOpen(event, item.id, item.options)}
            >
              {item.label}
            </Button>
          ))}

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
          >
            {activeButton && menuItems.find(item => item.id === activeButton)?.options.map((opt) => (
              <MenuItem
                key={opt.label}
                onClick={() => handleMenuSelect(opt.path)}
              >
                {opt.label}
              </MenuItem>
            ))}
          </Menu>
          <Button color="inherit" onClick={handleLogOut}>Log out</Button>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  ) : (
    <p>
      You are not logged in{" "}
      <button onClick={() => navigate('/login')}>Login</button>
    </p>
  );
};

export default SiteHeader;
