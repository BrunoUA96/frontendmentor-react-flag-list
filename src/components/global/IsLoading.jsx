import styled from 'styled-components';

export const IsLoading = styled.div`
  height: calc(100vh - 232px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

export const LoadingPreview = () => {
  return <IsLoading>Is Loading... 🤗</IsLoading>;
};
