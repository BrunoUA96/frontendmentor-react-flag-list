import { useEffect, useState } from 'react';

import { Card } from '@components/Card';
import { Controls } from '@components/Controls';
import { Header } from '@components/Header';
import { List } from '@components/List';
import { Main } from '@components/Main';
import axios from 'axios';

import { ALL_COUNTRIES } from './config';

function App() {
  const [countries, setCountries] = useState([]);

  console.log(countries);
  useEffect(() => {
    axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
  }, []);
  return (
    <>
      <Header />
      <Main>
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
            return <Card key={country.name} {...countryInfo} />;
          })}
        </List>
      </Main>
    </>
  );
}

export default App;
