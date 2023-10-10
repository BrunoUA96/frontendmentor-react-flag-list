import { useEffect, useState } from 'react';

import { filterByCode } from '@/config';
import { Button, Image, List, ListItem } from '@components/shared';
import axios from 'axios';
import styled from 'styled-components';

import { ListGroup, Meta, TagGroup, Wrapper } from '.';

const InfoTitle = styled.h1`
  margin: 0 0 1.5rem;
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
                <Button key={neighbor} to={`/country/${neighbor}`}>
                  {neighbor}
                </Button>
              ))}
            </TagGroup>
          )}
        </Meta>
      </div>
    </Wrapper>
  );
};
