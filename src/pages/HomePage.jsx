import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useGetCountriesQuery } from '@/Api/api';
import { selectedFilters } from '@/store/slices/filtersSlice';
import { selectedPage, setCurrentPage } from '@/store/slices/paginationSlice';
import { LoadingPreview } from '@components/global/IsLoading';
import { Card } from '@components/home/Card';
import { List } from '@components/home/List';
import { Pagination } from '@components/home/Pagination';
import { Controls } from '@components/home/filters/Controls';

export const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search, region } = useSelector(selectedFilters);

  //Get Countries
  const { data = [], error, isLoading } = useGetCountriesQuery();
  const [filteredCountries, setFilteredCountries] = useState(data);

  // Count of pages
  const firstUpdate = useRef(true);
  const { currentPage } = useSelector(selectedPage);
  const [paginationCount, setPaginationCount] = useState(1);
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
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    dispatch(setCurrentPage(1));
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
              setCurrentPage={pageNumber =>
                dispatch(setCurrentPage(pageNumber))
              }
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
