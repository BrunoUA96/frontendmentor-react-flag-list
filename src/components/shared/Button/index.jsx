import { Link } from 'react-router-dom';

import styled, { css } from 'styled-components';

const basicStyles = css`
  padding: 0 1rem;
  font-size: var(--fs-md);
  line-height: 2.5;
  box-shadow: var(--shadow);
  border-radius: var(--b-radius);
  background-color: var(--bg-element);
  text-decoration: none;

  border: none;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  color: var(--text-color);
  transition: var(--transition);
  cursor: pointer;

  &.active {
    background-color: black;
    color: white;
  }
`;

const StyledBtnLink = styled(Link)`
  ${basicStyles};
  font-size: var(--fs-sm);
`;

const StyledBtn = styled.button`
  ${basicStyles},
  &:disabled {
    opacity: 0.4;
    transition: var(--transition);
    color: var(--text-color);
    cursor: not-allowed;
  }
`;

export const Button = ({
  isLink = true,
  to = '',
  onClick = () => {},
  children,
  activeClass = false,
  disabled = false,
}) => {
  if (isLink) {
    return (
      <StyledBtnLink className={activeClass && 'active'} to={to}>
        {children}
      </StyledBtnLink>
    );
  }

  return (
    <StyledBtn
      disabled={disabled}
      className={activeClass && 'active'}
      onClick={onClick}
    >
      {children}
    </StyledBtn>
  );
};
