import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetCountriesQuery } from '@/Api/api';
import { Card } from '@components/home/Card';
import { List } from '@components/home/List';
import { Pagination } from '@components/home/Pagination';
import { Controls } from '@components/home/filters/Controls';

export const HomePage = () => {
  const navigate = useNavigate();

  //Get Countries
  const { data = [], error, isLoading } = useGetCountriesQuery();
  const [filteredCountries, setFilteredCountries] = useState(data);

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
    console.log('search:', search);
    let countries = [...data];

    if (search) {
      countries = countries.filter(country =>
        country.name.toLowerCase().includes(search.toLowerCase()),
      );

      // Reset pagination
      setCurrentPage(1);
    }

    if (region) {
      countries = countries.filter(country => country.region.includes(region));

      // Reset pagination
      setCurrentPage(1);
    }

    // Pagination
    countries = calculatePagination(countries);

    setFilteredCountries(countries);
  };

  useEffect(() => {
    onFilterCountries();
  }, [isLoading]);

  if (error) return <div>Somesing Wrong</div>;

  return (
    <>
      <Controls onFilterCountries={onFilterCountries} />

      <List>
        {isLoading ? (
          <div>Is Loading...</div>
        ) : (
          filteredCountries.map(country => {
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
          })
        )}
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
