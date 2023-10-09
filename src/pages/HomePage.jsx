import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ALL_COUNTRIES } from '@/config';
import { Card } from '@components/home/Card';
import { Controls } from '@components/home/Controls';
import { List } from '@components/home/List';
import axios from 'axios';

export const HomePage = ({ setCountries, countries }) => {
  const navigate = useNavigate();

  const [filteredCountries, setFilteredCountries] = useState(countries);

  const onFilterCountries = (search = '', region = '') => {
    let data = [...countries];

    if (search) {
      data = data.filter(country =>
        country.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (region) {
      data = data.filter(country => country.region.includes(region));
    }

    setFilteredCountries(data);
  };

  useEffect(() => {
    if (!countries.length)
      axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
  }, []);

  useEffect(() => {
    onFilterCountries();
  }, [countries]);

  return (
    <>
      <Controls onFilterCountries={onFilterCountries} />

      <List>
        {filteredCountries.map(country => {
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
