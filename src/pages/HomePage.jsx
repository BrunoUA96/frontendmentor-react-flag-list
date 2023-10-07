import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ALL_COUNTRIES } from '@/config';
import { Card } from '@components/Card';
import { Controls } from '@components/Controls';
import { List } from '@components/List';
import axios from 'axios';

export const HomePage = ({ countries, setCountries }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!countries.length)
      axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
  }, []);

  return (
    <>
      <Controls />

      <List>
        {countries.map(country => {
          const countryInfo = {
            title: country.name,
            img: country.flags.svg,
            listInfo: [
              { title: 'Population', description: country.population },
              { title: 'Region', description: country.region },
              { title: 'Capital', description: country.capital },
            ],
          };
          return (
            <Card
              key={country.name}
              onClick={() => navigate(`/country/${country.name}`)}
              {...countryInfo}
            />
          );
        })}
      </List>
    </>
  );
};
