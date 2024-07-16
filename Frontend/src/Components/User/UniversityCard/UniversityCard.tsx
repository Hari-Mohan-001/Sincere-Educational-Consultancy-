import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Grid, Container } from '@mui/material';
import { URL } from '../../../Constants/Constants';

// Define the Country interface
interface UniversityData {
    id: string;
    name: string;
    address: string;
    ranking: string;
    country: string;
    logo: string;
    images: string[];
    isApproved: boolean;
  }

interface CountryCardProps {
  university: UniversityData;
}

const CountryCard: React.FC<CountryCardProps> = ({ university }) => (
  <Card sx={{ width: 200, margin: 'auto' }}>
    <CardMedia
      component="img"
      height="140"
      image={university.logo}
      alt={university.name}
    />
    <CardContent>
      <Typography variant="h5" component="div">
        {university.name}
      </Typography>
    </CardContent>
  </Card>
);

const UniversityListCard: React.FC = () => {
  const [universities, setUniversities] = useState<UniversityData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${URL}/universities`);
        console.log(response.data);
        
        setUniversities(response.data.getAllUniversities);
      } catch (error) {
        console.error('Error fetching country data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        University List
      </Typography>
      <Grid container spacing={3}>
        {universities.map((university) => (
          <Grid item xs={12} sm={6} md={4} key={university.id}>
            <CountryCard university={university} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UniversityListCard;
