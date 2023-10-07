import styled from 'styled-components';

const Wrapper = styled.article`
  background-color: var(--bg-element);
  transition: var(--transition);
  border-radius: var(--b-radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  cursor: pointer;
`;
const CardImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  object-position: center;
`;
const CardBody = styled.div`
  padding: 1rem 1.5rem 2rem;
`;
const CardTitle = styled.h3`
  margin: 0;
  font-size: var(--fs-md);
  font-weight: var(--fw-bold);
  color: var(--text-color);
  transition: var(--transition);
`;
const CardList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 1rem 0 0;
`;
const CardListItem = styled.li`
  font-size: var(--fs-sm);
  color: var(--text-color);
  transition: var(--transition);

  & > b {
    font-weight: var(--fw-normal);
  }
`;

export const Card = ({ img, title, listInfo = [], onClick = () => {} }) => {
  return (
    <Wrapper onClick={onClick}>
      <CardImage src={img} />
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardList>
          {listInfo.map((element, index) => (
            <CardListItem key={index}>
              <b>{element.title}</b>: {element.description}
            </CardListItem>
          ))}
        </CardList>
      </CardBody>
    </Wrapper>
  );
};
