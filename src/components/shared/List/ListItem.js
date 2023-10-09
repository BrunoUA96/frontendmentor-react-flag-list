import styled from 'styled-components';

export const ListItem = styled.li`
  font-size: var(--fs-sm);
  color: var(--text-color);
  transition: var(--transition);
  line-height: 1.8;

  & > b {
    font-weight: var(--fw-normal);
  }
`;
