
import { Link, useNavigate } from 'react-router-dom';
import { List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PieChartIcon from '@mui/icons-material/PieChart';
import PublicIcon from '@mui/icons-material/Public';
import { useNav } from '../../../Context/SideNavbarContext';

const SideNavBar = () => {

  const { activeButton, setActiveButton } = useNav();
  const navigate = useNavigate()

  const handleClick=(i:number, path:string)=>{
   
    setActiveButton(i)
    navigate(path);
   } 

  return (
    <div className="w-60 bg-gray-800 text-white h-full shadow-xl">
      <div className="flex items-center justify-center h-16">
        <Typography variant="h5">Dashboard List</Typography>
      </div>
      <List>
        <ListItemButton
         className={`my-2 ${activeButton === 1 ? '!text-black !font-bold !bg-sky-400 !rounded-lg !shadow-lg' : 'hover:text-blue-700 text-white'}`}
         onClick={()=> handleClick(1 , "/admin/dashboard")}>
          <ListItemIcon className="text-white">
            <PieChartIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton
         className={`my-2 ${activeButton === 2 ? '!text-black !font-bold !bg-sky-400 !rounded-lg !shadow-lg' : 'hover:text-blue-700 text-white'}`}
         onClick={()=> handleClick(2 , "/admin/students")}>
          <ListItemIcon className="text-white">
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Student List" />
        </ListItemButton>
        <ListItemButton 
        className={`my-2 ${activeButton === 3 ? '!text-black !font-bold !bg-sky-400 !rounded-lg !shadow-lg' : 'hover:text-blue-700 text-white'}`}
        onClick={()=> handleClick(3 , "/admin/courses")}>          
     <ListItemIcon className="text-white">
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItemButton>
        <ListItemButton 
         className={`my-2 ${activeButton === 4 ? '!text-black !font-bold !bg-sky-400 !rounded-lg !shadow-lg' : 'hover:text-blue-700 text-white'}`}
         onClick={()=> handleClick(4 , "/admin/universities")}>
          <ListItemIcon className="text-white">
            <AccountBalanceIcon />
          </ListItemIcon>
          <ListItemText primary="Universities" />
        </ListItemButton>
        <ListItemButton 
        className={`my-2 ${activeButton === 5 ? '!text-black !font-bold !bg-sky-400 !rounded-lg !shadow-lg' : 'hover:text-blue-700 text-white'}`}
        onClick={()=> handleClick(5 , "/admin/countries")}>
          <ListItemIcon className="text-white">
            <PublicIcon />
          </ListItemIcon>
          <ListItemText primary="Country" />
        </ListItemButton>
        <ListItemButton 
        className={`my-2 ${activeButton === 6 ? '!text-black !font-bold !bg-sky-400 !rounded-lg !shadow-lg' : 'hover:text-blue-700 text-white'}`}
        onClick={()=> handleClick(6 , "/admin/enrollment")}>
          <ListItemIcon className="text-white">
            <PublicIcon />
          </ListItemIcon>
          <ListItemText primary="Enrollment" />
        </ListItemButton>
        <ListItemButton 
        className={`my-2 ${activeButton === 7 ? '!text-black !font-bold !bg-sky-400 !rounded-lg !shadow-lg' : 'hover:text-blue-700 text-white'}`}
        onClick={()=> handleClick(7 , "/admin/orders")}>
          <ListItemIcon className="text-white">
            <PublicIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItemButton>
      </List>
    </div>
  );
};

export default SideNavBar;
