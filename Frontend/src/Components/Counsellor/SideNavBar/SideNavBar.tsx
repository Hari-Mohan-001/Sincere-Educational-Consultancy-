import { useNavigate } from 'react-router-dom';
import { IconButton, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useNav } from '../../../Context/SideNavbarContext';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import PieChartIcon from '@mui/icons-material/PieChart';


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
    <div className='h-full'>
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
            className={`my-2 ${activeButton === 1 ? '!text-black !font-bold !bg-cyan-700 !rounded-lg !shadow-lg' : 'hover:text-blue-700 text-white'}`}
            onClick={() => handleClick(1, '/counsellor/students')}
          >
            <ListItemIcon className="text-white">
            <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Student List" />
          </ListItemButton>
          <ListItemButton
            className={`my-2 ${activeButton === 2 ? '!text-black !font-bold !bg-cyan-700 !rounded-lg !shadow-lg' : 'hover:text-blue-700 text-white'}`}
            onClick={() => handleClick(2, '/counsellor/courses')}
          >
            <ListItemIcon className="text-white">
              <PieChartIcon />
            </ListItemIcon>
            <ListItemText primary="Courses" />
          </ListItemButton>
          <ListItemButton
            className={`my-2 ${activeButton === 3 ? '!text-black !font-bold !bg-cyan-700 !rounded-lg !shadow-lg' : 'hover:text-blue-700 text-white'}`}
            onClick={() => handleClick(3, '/counsellor/university')}
          >
            <ListItemIcon className="text-white">
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="University" />
          </ListItemButton>
          <ListItemButton
            className={`my-2 ${activeButton === 4 ? '!text-black !font-bold !bg-cyan-700 !rounded-lg !shadow-lg' : 'hover:text-blue-700 text-white'}`}
            onClick={() => handleClick(4, '/counsellor/domain')}
          >
            <ListItemIcon className="text-white">
              <AccountBalanceIcon />
            </ListItemIcon>
            <ListItemText primary="Domains" />
          </ListItemButton>
         
          
         
          
          
          {/* More list items can go here */}
        </List>
      </div>
    </div>
  );
};

export default SideNavBar;


{/* <div className="w-60 bg-cyan-950 text-white h-full shadow-xl">
      <div className="flex items-center justify-center h-16">
        <Typography variant="h5">Dashboard List</Typography>
      </div>
      <List>
        <ListItemButton
        className={`my-2 ${activeButton === 1 ? '!text-black !font-bold !bg-slate-400 !rounded-lg !shadow-lg' : 'hover:text-blue-700 text-white'}`}
        onClick={()=> handleClick(1 , "/counsellor/students")}>
          <ListItemIcon className="text-white">
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Student List" />
        </ListItemButton>
        <ListItemButton 
        className={`my-2 ${activeButton === 2 ? '!text-black !font-bold !bg-slate-400 !rounded-lg !shadow-lg' : 'hover:text-blue-700 text-white'}`}
        onClick={()=> handleClick(2, "/counsellor/courses" )}>
          <ListItemIcon className="text-white">
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItemButton>
        <ListItemButton 
        className={`my-2 ${activeButton === 3 ? '!text-black !font-bold !bg-slate-400 !rounded-lg !shadow-lg' : 'hover:text-blue-700 text-white'}`}
        onClick={()=> handleClick(3, "/counsellor/university" )}>
          <ListItemIcon className="text-white">
            <AccountBalanceIcon />
          </ListItemIcon>
          <ListItemText primary="Universities" />
        </ListItemButton>
        
        <ListItemButton
        className={`my-2 ${activeButton === 4 ? '!text-black !font-bold !bg-slate-400 !rounded-lg !shadow-lg' : 'hover:text-blue-700 text-white'}`}
        onClick={()=> handleClick(4, "/counsellor/domain" )}>
          <ListItemIcon className="text-white">
            <PublicIcon />
          </ListItemIcon>
          <ListItemText primary="Domain" />
        </ListItemButton>
      </List>
    </div> */}