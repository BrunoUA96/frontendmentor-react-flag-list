import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { filterByCode } from '@/config';
import { Image } from '@components/shared/Image';
import { List } from '@components/shared/list/List';
import { ListItem } from '@components/shared/list/ListItem';
import axios from 'axios';
import styled from 'styled-components';

const Wrapper = styled.section`
  margin-top: 3rem;
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  gap: 2rem;

  @media (min-width: 767px) {
    grid-template-columns: minmax(100px, 400px) 1fr;
    align-items: center;
    gap: 5rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: minmax(400px, 600px) 1fr;
  }
`;

const InfoTitle = styled.h1`
  margin: 0 0 1.5rem;
`;

const ListGroup = styled.div`
  display: flex;
  flex-direction: column;

  gap: 2rem;

  @media (min-width: 1200px) {
    flex-direction: row;
    gap: 4rem;
  }
`;

const Meta = styled.div`
  margin-top: 3rem;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  align-items: flex-start;

  & > b {
    font-weight: var(--fw-normal);
  }

  @media (min-width: 1200px) {
    flex-direction: row;
    align-items: center;
  }
`;

const TagGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Tag = styled(Link)`
  padding: 0 1rem;
  background-color: var(--bg-element);
  text-decoration: none;
  color: var(--text-color);
  transition: var(--transition);

  box-shadow: var(--shadow);
  line-height: 1.5;
  cursor: pointer;
`;

export const Info = props => {
  const {
    name,
    nativeName,
    flag,
    capital,
    population,
    region,
    subregion,
    topLevelDomain,
    currencies = [],
    languages = [],
    borders = [],
  } = props;

  const [neighbors, setNeighbors] = useState([]);

  useEffect(() => {
    if (borders.length)
      axios
        .get(filterByCode(borders))
        .then(({ data }) => setNeighbors(data.map(country => country.name)));
  }, [borders]);

  return (
    <Wrapper>
      <Image height="auto" src={flag} alt={name} />

      <div>
        <InfoTitle>{name}</InfoTitle>

        <ListGroup>
          <List content="0">
            <ListItem>
              <b>Native Name:</b> {nativeName}
            </ListItem>
            <ListItem>
              <b>Population:</b> {population}
            </ListItem>
            <ListItem>
              <b>Region:</b> {region}
            </ListItem>
            <ListItem>
              <b>Sub Region:</b> {subregion}
            </ListItem>
            <ListItem>
              <b>Capital:</b> {capital}
            </ListItem>
          </List>
          <List content="0">
            <ListItem>
              <b>Top Level Domain:</b>{' '}
              {topLevelDomain.map(domain => (
                <span key={domain}>{domain}</span>
              ))}
            </ListItem>
            <ListItem>
              <b>Currency:</b>{' '}
              {currencies.map(currency => (
                <span key={currency.code}>{currency.name} </span>
              ))}
            </ListItem>
            <ListItem>
              <b>Languages:</b>{' '}
              {languages.map(language => (
                <span key={language.name}>{language.name}</span>
              ))}
            </ListItem>
          </List>
        </ListGroup>

        <Meta>
          <b>Border Countries:</b>

          {!borders.length ? (
            <span>There is no border countries</span>
          ) : (
            <TagGroup>
              {neighbors.map(neighbor => (
                <Tag key={neighbor} to={`/country/${neighbor}`}>
                  {neighbor}
                </Tag>
              ))}
            </TagGroup>
          )}
        </Meta>
      </div>
    </Wrapper>
  );
};
