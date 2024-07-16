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

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => (
  <Card sx={{ width: 200, margin: 'auto' }}>
    <CardMedia
      component="img"
      height="140"
      image={country.image}
      alt={country.name}
    />
    <CardContent>
      <Typography variant="h5" component="div">
        {country.name}
      </Typography>
    </CardContent>
  </Card>
);

const CountryListCard: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${URL}/countries`);
        console.log(response.data);
        
        setCountries(response.data.data);
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
        Country List
      </Typography>
      <Grid container spacing={3}>
        {countries.map((country) => (
          <Grid item xs={12} sm={6} md={4} key={country.id}>
            <CountryCard country={country} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CountryListCard;
