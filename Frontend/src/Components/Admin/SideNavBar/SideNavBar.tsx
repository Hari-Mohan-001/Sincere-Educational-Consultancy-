
import { Link } from 'react-router-dom';
import { List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PieChartIcon from '@mui/icons-material/PieChart';
import PublicIcon from '@mui/icons-material/Public';

const SideNavBar = () => {
  return (
    <div className="w-60 bg-gray-800 text-white h-full shadow-xl">
      <div className="flex items-center justify-center h-16">
        <Typography variant="h5">Dashboard List</Typography>
      </div>
      <List>
        <ListItemButton component={Link} to="/admin/dashboard" className="my-2 hover:text-blue-700 text-white">
          <ListItemIcon className="text-white">
            <PieChartIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={Link} to="/admin/students" className="my-2 hover:text-blue-700 text-white">
          <ListItemIcon className="text-white">
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Student List" />
        </ListItemButton>
        <ListItemButton component={Link} to="/admin/courses" className="my-2 bg-blue-600 hover:text-blue-700 text-white">
          <ListItemIcon className="text-white">
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItemButton>
        <ListItemButton component={Link} to="/admin/universities" className="my-2 bg-blue-600 hover:text-blue-700 text-white">
          <ListItemIcon className="text-white">
            <AccountBalanceIcon />
          </ListItemIcon>
          <ListItemText primary="Universities" />
        </ListItemButton>
        <ListItemButton component={Link} to="/admin/countries" className="my-2 bg-white hover:text-blue-700 hover:bg-blue-700 text-white">
          <ListItemIcon className="text-white">
            <PublicIcon />
          </ListItemIcon>
          <ListItemText primary="Country" />
        </ListItemButton>
        <ListItemButton component={Link} to="/admin/enrollment" className="my-2 bg-white hover:text-blue-700 hover:bg-blue-700 text-white">
          <ListItemIcon className="text-white">
            <PublicIcon />
          </ListItemIcon>
          <ListItemText primary="Enrollment" />
        </ListItemButton>
      </List>
    </div>
  );
};

export default SideNavBar;
