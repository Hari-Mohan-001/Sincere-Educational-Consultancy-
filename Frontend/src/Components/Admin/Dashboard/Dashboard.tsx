
import {  Link } from 'react-router-dom';
import { List, ListItemIcon, ListItemText, Drawer, CssBaseline, AppBar, Toolbar, Typography, ListItemButton } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// import StudentList from './StudentList';
// import Courses from './Courses';
// import Universities from './Universities';

// const drawerWidth = 240;

const Appusing = () => {
  return (
    
    <div className="flex">
    <CssBaseline />
    <AppBar position="fixed" className="ml-60 w-[calc(100%-240px)]">
      <Toolbar>
        <Typography variant="h6" noWrap>
          Admin Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
    <Drawer
      variant="permanent"
      className="w-60 flex-shrink-0"
      classes={{ paper: "w-60" }}
    >
      <div className="flex items-center justify-center h-16">
        <Typography variant="h5">Menu</Typography>
      </div>
      <List>
        <ListItemButton component={Link} to="/students">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Student List" />
        </ListItemButton>
        <ListItemButton component={Link} to="/courses">
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItemButton>
        <ListItemButton component={Link} to="/universities">
          <ListItemIcon>
            <AccountBalanceIcon />
          </ListItemIcon>
          <ListItemText primary="Universities" />
        </ListItemButton>
      </List>
    </Drawer>
    {/* <main className="flex-grow p-8 mt-16 ml-60">
      <Switch>
        <Route path="/students" component={StudentList} />
        <Route path="/courses" component={Courses} />
        <Route path="/universities" component={Universities} />
        <Route path="/" exact component={StudentList} />
      </Switch>
    </main> */}
  </div>
    
  );
};

export default Appusing;
