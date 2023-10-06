import { IoSearch } from 'react-icons/io5';

import { styled } from 'styled-components';

const InputContainer = styled.label`
  background-color: var(--bg-element);
  transition: var(--transition);
  padding: 1rem 2rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  border-radius: var(--b-radius);
  box-shadow: var(--shadow);
  width: 100%;
  margin-bottom: 1.5rem;

  @media (min-width: 767px) {
    width: 280px;
    margin-bottom: 0;
  }
`;

const Icon = styled(IoSearch)`
  width: 17px;
  height: 17px;
  flex-shrink: 0;
  color: var(--text-color);
  transition: var(--transition);
`;

const Input = styled.input.attrs({
  type: 'search',
  placeholder: 'Search for a country...',
})`
  border: none;
  outline: none;
  background-color: var(--bg-element);
  font-size: var(--fs-sm);
  color: var(--text-color);
  transition: var(--transition);
`;

export const Search = ({ search, setSearch }) => {
  return (
    <InputContainer>
      <Icon />
      <Input onChange={e => setSearch(e.target.value)} value={search} />
    </InputContainer>
  );
};
