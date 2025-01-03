import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Divider,
  List,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  LockOpen,
  Lock,
  Login,
  Home,
  Person,
  ChevronLeft,
  ChevronRight,
  Info,
  People,
  School,
  MenuBook,
  LocalLibrary,
} from "@mui/icons-material";
import { AppBar, IconButton, Button, Container, DrawerHeader, Main } from "./style";
import LanguageSwitch from "../../../components/languageSwitch";
import MainRoutes from "../../../routes";
import { isValidToken } from "../../../components/protectedRoute";

const NavigationBar: React.FC = () => {
  const drawerWidth = 240;
  
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <AppBar position="static" color="default" open={open}>
        <Toolbar>
          {token && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(true)}
              open={open}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h4">{t("Logo")}</Typography>
          <Container>
            {(token && isValidToken(token)) ? (
              <>
                <Button
                  isactive={location.pathname === "/signout"}
                  startIcon={<Lock />}
                  variant="outlined"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/");
                    setOpen(false);
                  }}
                >
                  {t("signout")}
                </Button>
                <LanguageSwitch />
              </>
            ) : (
              <>
                <Button
                  isactive={location.pathname === "/signup"}
                  startIcon={<LockOpen />}
                  variant="outlined"
                  href="/signup"
                >
                  {t("signup")}
                </Button>
                <Button
                  isactive={location.pathname === "/signin"}
                  startIcon={<Login />}
                  variant="outlined"
                  href="/signin"
                >
                  {t("signin")}
                </Button>
              </>
            )}
          </Container>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        onClose={() => setOpen(true)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "linear-gradient(45deg, #45b649 10%,#DCE35B 90%)",
          },
        }}
      >
        <DrawerHeader>
          <IconButton 
            onClick={() => setOpen(false)}
            open={false}
          >
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {token && (
          <List sx={{ paddingTop: "70px" }}>
            <ListItem 
              component={(props) => <Link {...props} to="/" />}
            > 
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary={t("home")} sx={{ color: "black"}}></ListItemText>
            </ListItem>
            <ListItem component={(props) => <Link {...props} to="/members" />}
            >
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary={t("members")} sx={{ color: "black"}}></ListItemText>
            </ListItem>
            <ListItem 
              component={(props) => <Link {...props} to="/members?role=student" />}
            >
              <ListItemIcon>
                <School />
              </ListItemIcon>
              <ListItemText primary={t("students")} sx={{ color: "black"}}></ListItemText>
            </ListItem>
            <ListItem 
              component={(props) => <Link {...props} to="/members?role=teacher" />}
            >
              <ListItemIcon>
                <LocalLibrary />
              </ListItemIcon>
              <ListItemText primary={t("teachers")} sx={{ color: "black"}}></ListItemText>
            </ListItem>
            <ListItem component={(props) => <Link {...props} to={`/profile`} />}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary={t("myProfile")} sx={{ color: "black"}}></ListItemText>
            </ListItem>
            <ListItem component={(props) => <Link {...props} to="/courses" />}>
              <ListItemIcon>
                <MenuBook />
              </ListItemIcon>
              <ListItemText primary={t("courses")} sx={{ color: "black"}}></ListItemText>
            </ListItem>
            <ListItem component={(props) => <Link {...props} to="/about" />}>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <ListItemText primary={t("about")} sx={{ color: "black"}}></ListItemText>
            </ListItem>
          </List>
        )}
      </Drawer> 
      <Main open={open}>
        <MainRoutes />
      </Main>
    </>
  );
};

export default NavigationBar;
