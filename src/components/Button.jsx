import styled from 'styled-components';

export const Button = styled.button`
  padding: 0 1rem;
  background-color: var(--bg-element);
  box-shadow: var(--shadow);
  line-height: 2.5;
  border-radius: var(--b-radius);

  border: none;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  color: var(--text-color);
  transition: var(--transition);
  cursor: pointer;
`;
