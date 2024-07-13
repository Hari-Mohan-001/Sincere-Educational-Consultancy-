
import  { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { ADMIN_BASE_URL } from '../../../Constants/Constants';
import { ResponseUserData } from '../../../Interface/User/UserInterface';

const StudentList = () => {
  const [students, setStudents] = useState<ResponseUserData[]>([]);

  useEffect(() => {
    getAllUser();
  }, []);
  const getAllUser = async () => {
    try {
      const res = await fetch(`${ADMIN_BASE_URL}/students`);
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-3 my-0">
      <Typography variant='h4' align='center'>Students</Typography>
      
      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead className="bg-gray-800">
            <TableRow>
            <TableCell sx={{ color: 'white', width: '5%' }}>No</TableCell>
              <TableCell sx={{ color: 'white', width: '25%' }}>Name</TableCell>
              <TableCell sx={{ color: 'white', width: '30%' }}>Email</TableCell>
              <TableCell sx={{ color: 'white', width: '20%' }}>Phone</TableCell>
              <TableCell sx={{ color: 'white', width: '20%' }}>Qualification</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={student.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.mobile}</TableCell>
                <TableCell>{student.qualification}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StudentList;
