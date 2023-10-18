import { useEffect, useState } from 'react';
import { IoMoon, IoMoonOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectedTheme, setTheme } from '@/store/themeSlice';
import styled from 'styled-components';

import { Container } from '../Container';

const HeaderElement = styled.div`
  box-shadow: var(--shadow);
  background-color: var(--bg-element);
  transition: var(--transition);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
`;

const Title = styled(Link)`
  text-decoration: none;
  color: var(--text-color);
  font-size: var(--fs-md);
  font-weight: var(--fw-bold);
`;

const ThemeSwitcher = styled.div`
  cursor: pointer;
  font-size: var(--fs-sm);
  font-weight: var(--fw-normal);
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-transform: capitalize;

  span {
    display: none;
  }
`;

export const Header = () => {
  const dispatch = useDispatch();

  const { theme } = useSelector(selectedTheme);

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    // Add theme attr to body element
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <HeaderElement>
      <Container>
        <Wrapper>
          <Title to="/">Where in the world?</Title>
          <ThemeSwitcher onClick={toggleTheme}>
            {theme === 'light' ? (
              <IoMoonOutline size="16px" />
            ) : (
              <IoMoon size="16px" />
            )}
            {theme} Mode
          </ThemeSwitcher>
        </Wrapper>
      </Container>
    </HeaderElement>
  );
};
