import { useDispatch, useSelector } from 'react-redux';

import {
  selectedFilters,
  setRegion,
  setSearch,
} from '@/store/slices/filtersSlice';
import styled from 'styled-components';

import { CustomSelect } from './CustomSelect';
import { Search } from './Search';

const selectOptions = [
  { value: 'Africa', label: 'Africa' },
  { value: 'America', label: 'America' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Europe', label: 'Europe' },
  { value: 'Oceania', label: 'Oceania' },
];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 767px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Controls = () => {
  const dispatch = useDispatch();

  const { search, region } = useSelector(selectedFilters);

  const defaultRegionValue = {
    value: '',
    label: '',
  };

  const onChangeRegion = region => {
    if (region === null) region = defaultRegionValue;

    dispatch(setRegion(region));
  };

  return (
    <Wrapper>
      <Search
        search={search}
        setSearch={search => dispatch(setSearch(search))}
      />
      <CustomSelect
        isClearable
        isSearchable={false}
        placeholder="Filter by Region"
        options={selectOptions}
        value={region.value ? region : ''}
        onChange={onChangeRegion}
      />
    </Wrapper>
  );
};
