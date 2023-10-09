import { Image } from '@components/shared/Image';
import { List } from '@components/shared/list/List';
import { ListItem } from '@components/shared/list/ListItem';
import styled from 'styled-components';

const Wrapper = styled.article`
  background-color: var(--bg-element);
  transition: var(--transition);
  border-radius: var(--b-radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  cursor: pointer;
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

export const Card = ({ img, title, listInfo = [], onClick = () => {} }) => {
  return (
    <Wrapper onClick={onClick}>
      <Image height="150px" src={img} />
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <List content="1rem 0 0">
          {listInfo.map((element, index) => (
            <ListItem key={index}>
              <b>{element.title}</b>: {element.description}
            </ListItem>
          ))}
        </List>
      </CardBody>
    </Wrapper>
  );
};
