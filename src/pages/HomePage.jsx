import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ALL_COUNTRIES } from '@/config';
import { Card } from '@components/home/Card';
import { List } from '@components/home/List';
import { Pagination } from '@components/home/Pagination';
import { Controls } from '@components/home/filters/Controls';
import axios from 'axios';

export const HomePage = ({ setCountries, countries }) => {
  const navigate = useNavigate();

  const [filteredCountries, setFilteredCountries] = useState(countries);

  // Count of pages
  const [paginationCount, setPaginationCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const calculatePagination = data => {
    setPaginationCount(Math.ceil(data.length / itemsPerPage));

    return data.slice(
      itemsPerPage * (currentPage - 1),
      itemsPerPage * currentPage,
    );
  };

  const onFilterCountries = (search = '', region = '') => {
    let data = [...countries];

    if (search) {
      // Reset pagination
      setCurrentPage(1);

      data = data.filter(country =>
        country.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (region) {
      // Reset pagination
      setCurrentPage(1);

      data = data.filter(country => country.region.includes(region));
    }

    // Pagination
    data = calculatePagination(data);

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

      {/* Pagination */}
      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        paginationCount={paginationCount}
      />
    </>
  );
};
