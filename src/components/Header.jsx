import { useEffect, useState } from 'react';
import { IoMoon, IoMoonOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { Container } from './Container';

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
  const [themeColor, setThemeColor] = useState('light');

  const toggleTheme = () =>
    setThemeColor(themeColor === 'light' ? 'dark' : 'light');

  useEffect(() => {
    // Add theme attr to body element
    document.body.setAttribute('data-theme', themeColor);
  }, [themeColor]);

  return (
    <HeaderElement>
      <Container>
        <Wrapper>
          <Title to="/">Where in the world?</Title>
          <ThemeSwitcher onClick={toggleTheme}>
            {themeColor === 'light' ? (
              <IoMoonOutline size="16px" />
            ) : (
              <IoMoon size="16px" />
            )}
            {themeColor} Mode
          </ThemeSwitcher>
        </Wrapper>
      </Container>
    </HeaderElement>
  );
};
