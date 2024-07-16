import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Grid, Container } from '@mui/material';
import { URL } from '../../../Constants/Constants';

// Define the Country interface
interface Country {
  id: number;
  name: string;
  image: string;
}

interface CourseData {
    id:string,
    name: string;
    qualification: string;
    fees: string;
    description: string;
    duration: string;
    university: string;
    logo: string;
  }

interface CountryCardProps {
  course: CourseData;
}

const CountryCard: React.FC<CountryCardProps> = ({ course }) => (
  <Card sx={{ width: 200, margin: 'auto' }}>
    <CardMedia
      component="img"
      height="140"
      image={course.duration}
      alt={course.name}
    />
    <CardContent>
      <Typography variant="h5" component="div">
        {course.name}
      </Typography>
    </CardContent>
  </Card>
);

const CourseListCard: React.FC = () => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${URL}/courses`);
        console.log('corse',response.data);
        
        setCourses(response.data.data);
      } catch (error) {
        console.error('Error fetching country data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Courses Offered
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <CountryCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CourseListCard;
