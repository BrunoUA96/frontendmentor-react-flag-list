import styled from 'styled-components';

export const ListGroup = styled.div`
  display: flex;
  flex-direction: column;

  gap: 2rem;

  @media (min-width: 1200px) {
    flex-direction: row;
    gap: 4rem;
  }
`;
