import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItemButton, ListItemIcon, ListItemText, Typography, IconButton } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PieChartIcon from '@mui/icons-material/PieChart';
import PublicIcon from '@mui/icons-material/Public';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNav } from '../../../Context/SideNavbarContext';

const SideNavBar = () => {
  const { activeButton, setActiveButton } = useNav();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to control sidebar visibility on mobile

  const handleClick = (i: number, path: string) => {
    setActiveButton(i);
    navigate(path);
    if (window.innerWidth < 768) setIsSidebarOpen(false); // Close sidebar on mobile after navigating
  };

  return (
    <div>
      {/* Hamburger Menu for Mobile View */}
      <div className="md:hidden flex justify-between items-center bg-gray-800 p-4">
        <Typography variant="h5" className="text-white"></Typography>
        <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <CloseIcon className="text-white" /> : <MenuIcon className="text-white" />}
        </IconButton>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transform md:w-60 w-48 bg-gray-800 text-white h-full shadow-xl fixed md:relative transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex items-center justify-center h-16">
          <Typography variant="h5">Dashboard List</Typography>
        </div>
        <List>
          <ListItemButton
            className={`my-2 ${activeButton === 1 ? '!text-black !font-bold !bg-sky-400 !rounded-lg !shadow-lg' : 'hover:text-blue-700 text-white'}`}
            onClick={() => handleClick(1, '/admin/dashboard')}
          >
            <ListItemIcon className="text-white">
              <PieChartIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton
            className={`my-2 ${activeButton === 2 ? '!text-black !font-bold !bg-sky-400 !rounded-lg !shadow-lg' : 'hover:text-blue-700 text-white'}`}
            onClick={() => handleClick(2, '/admin/students')}
          >
            <ListItemIcon className="text-white">
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Student List" />
          </ListItemButton>
          <ListItemButton
            className={`my-2 ${activeButton === 3 ? '!text-black !font-bold !bg-sky-400 !rounded-lg !shadow-lg' : 'hover:text-blue-700 text-white'}`}
            onClick={() => handleClick(3, '/admin/courses')}
          >
            <ListItemIcon className="text-white">
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Courses" />
          </ListItemButton>
          <ListItemButton
            className={`my-2 ${activeButton === 4 ? '!text-black !font-bold !bg-sky-400 !rounded-lg !shadow-lg' : 'hover:text-blue-700 text-white'}`}
            onClick={() => handleClick(4, '/admin/universities')}
          >
            <ListItemIcon className="text-white">
              <AccountBalanceIcon />
            </ListItemIcon>
            <ListItemText primary="Universities" />
          </ListItemButton>
          <ListItemButton
            className={`my-2 ${activeButton === 5 ? '!text-black !font-bold !bg-sky-400 !rounded-lg !shadow-lg' : 'hover:text-blue-700 text-white'}`}
            onClick={() => handleClick(5, '/admin/countries')}
          >
            <ListItemIcon className="text-white">
              <PublicIcon />
            </ListItemIcon>
            <ListItemText primary="Country" />
          </ListItemButton>
          <ListItemButton
            className={`my-2 ${activeButton === 6 ? '!text-black !font-bold !bg-sky-400 !rounded-lg !shadow-lg' : 'hover:text-blue-700 text-white'}`}
            onClick={() => handleClick(6, '/admin/enrollment')}
          >
            <ListItemIcon className="text-white">
              <PublicIcon />
            </ListItemIcon>
            <ListItemText primary="Enrollments" />
          </ListItemButton>
          <ListItemButton
            className={`my-2 ${activeButton === 7 ? '!text-black !font-bold !bg-sky-400 !rounded-lg !shadow-lg' : 'hover:text-blue-700 text-white'}`}
            onClick={() => handleClick(7, '/admin/orders')}
          >
            <ListItemIcon className="text-white">
              <PublicIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>
          <ListItemButton
            className={`my-2 ${activeButton === 8 ? '!text-black !font-bold !bg-sky-400 !rounded-lg !shadow-lg' : 'hover:text-blue-700 text-white'}`}
            onClick={() => handleClick(8, '/admin/counsellors')}
          >
            <ListItemIcon className="text-white">
              <PublicIcon />
            </ListItemIcon>
            <ListItemText primary="Counsellors" />
          </ListItemButton>
          
          {/* More list items can go here */}
        </List>
      </div>
    </div>
  );
};

export default SideNavBar;
