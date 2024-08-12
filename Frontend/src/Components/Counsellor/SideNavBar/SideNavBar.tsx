
import { Link, useNavigate } from 'react-router-dom';
import { List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PublicIcon from '@mui/icons-material/Public';
import { useEffect, useState } from 'react';

const SideNavBar = () => {

 const [activeButton , setActiveButton] = useState<number|null>(null)

 const handleClick=(i:number)=>{
  
  
  setActiveButton(i)
 
 }


  return (
    <div className="w-60 bg-cyan-950 text-white h-full shadow-xl">
      <div className="flex items-center justify-center h-16">
        <Typography variant="h5">Dashboard List{activeButton}</Typography>
      </div>
      <List>
        <ListItemButton component={Link} to="/counsellor/students" 
        className={`my-2 ${activeButton === 0 ? '!text-blue-500 !bg-white' : 'hover:text-blue-700 text-white'}`}
        onClick={()=> handleClick(0)}>
          <ListItemIcon className="text-white">
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Student List" />
        </ListItemButton>
        <ListItemButton component={Link} to="/counsellor/courses" 
        className={`my-2 ${activeButton === 1 ? 'text-blue-500' : 'hover:text-blue-700 text-white'}`}
        onClick={()=> handleClick(1)}>
          <ListItemIcon className="text-white">
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItemButton>
        <ListItemButton component={Link} to="/counsellor/university" className="my-2 bg-blue-600 hover:text-blue-700 text-white">
          <ListItemIcon className="text-white">
            <AccountBalanceIcon />
          </ListItemIcon>
          <ListItemText primary="Universities" />
        </ListItemButton>
        
        <ListItemButton component={Link} to="/counsellor/domain" className="my-2 bg-white hover:text-blue-700 hover:bg-blue-700 text-white">
          <ListItemIcon className="text-white">
            <PublicIcon />
          </ListItemIcon>
          <ListItemText primary="Domain" />
        </ListItemButton>
      </List>
    </div>
  );
};

export default SideNavBar;
