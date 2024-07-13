import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import TableComponent from './Layout/Table';



const Sample = () => {
  const [students, setStudents] = useState([]);

//   useEffect(() => {
//     // Fetch students data from the API
//     axios.get('/api/students')
//       .then(response => setStudents(response.data))
//       .catch(error => console.error('Error fetching students:', error));
//   }, []);

  const handleBlock = () => {
    // Implement block functionality here
    console.log('Block student with id:');
  };

  const columns = [
    { id: 'no', label: 'No', minWidth: 50 },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'mobile', label: 'Phone', minWidth: 100 },
    { id: 'qualification', label: 'Qualification', minWidth: 100 },
    { 
      id: 'actions', 
      label: 'Actions', 
      minWidth: 100, 
      render: () => (
        <Button variant="contained" color="secondary" onClick={() => handleBlock()}>
          Block
        </Button>
      ) 
    },
  ];

  const data = [{
    no:  1,
    id: '12',
    name: 'john',
    email: 'john@.com',
    mobile: '1234567898',
    qualification: 'degree',
  },{
    no:  1,
    id: '13',
    name: 'doe',
    email: 'john@.com',
    mobile: '1234567898',
    qualification: 'masters',
  }]

  return <TableComponent title="Students" columns={columns} data={data} />;
};

export default Sample;
