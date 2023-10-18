import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useGetCountriesQuery } from '@/Api/api';
import { selectedFilters } from '@/store/filtersSlice';
import { LoadingPreview } from '@components/global/IsLoading';
import { Card } from '@components/home/Card';
import { List } from '@components/home/List';
import { Pagination } from '@components/home/Pagination';
import { Controls } from '@components/home/filters/Controls';

export const HomePage = () => {
  const navigate = useNavigate();

  const { search, region } = useSelector(selectedFilters);

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

  const onFilterCountries = (searchValue = '', regionValue = '') => {
    let countries = [...data];

    if (searchValue) {
      countries = countries.filter(country =>
        country.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }

    if (regionValue) {
      countries = countries.filter(country =>
        country.region.includes(regionValue),
      );
    }

    // Pagination
    countries = [...calculatePagination(countries)];

    setFilteredCountries(countries);
  };

  useEffect(() => {
    onFilterCountries();
  }, [isLoading]);

  useEffect(() => {
    onFilterCountries(search, region.value);
  }, [search, region, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, region]);

  if (error) return <div>Somesing Wrong</div>;

  return (
    <>
      <Controls />

      {isLoading ? (
        <LoadingPreview />
      ) : (
        <>
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
          {filteredCountries.length ? (
            <Pagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              paginationCount={paginationCount}
            />
          ) : (
            ''
          )}
        </>
      )}
    </>
  );
};
