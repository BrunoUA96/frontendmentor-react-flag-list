import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ALL_COUNTRIES } from '@/config';
import { Card } from '@components/Card';
import { Controls } from '@components/Controls';
import { List } from '@components/List';
import axios from 'axios';

export const HomePage = ({ setCountries, countries }) => {
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

  const navigate = useNavigate();

  useEffect(() => {
    if (!countries.length)
      axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
  }, []);

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
