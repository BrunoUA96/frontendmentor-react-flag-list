import { useState } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

import { Button } from '@components/shared';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const Pagination = ({
  currentPage,
  paginationCount,
  setCurrentPage,
}) => {
  /**
   * If active page is 8 (for example), firstPageNumber = 6 - is leftmost button
   * ['<', '...', '6', '7', '8*', '9', '10', '...', '>']
   * The number of the active page is number with '*'
   */
  const [firstPageNumber, setFirstPageNumber] = useState(0);

  /**
   * The number of nearest page buttons
   * ['<', '1', '2', '3', '4', '5', '>'] - arrows are not counted
   */
  const numOfNearestPages = paginationCount >= 5 ? 5 : paginationCount;

  const pagesArray = [];

  //
  [...new Array(paginationCount)].map((_, index) => {
    pagesArray[index] = index + 1;
  });

  /**
   * My idea is to show only 5 pages
   * for example:
   * - if active FIRST page im showing ['<', '...', '1*', '2', '3', '4', '5', '...', '>'] pages
   * - if active SECOND page im showing ['<', '...', '1', '2*', '3', '4', '5', '...', '>']
   * - and exactly with THIRD page active ['<', '...', '1', '2', '3*', '4', '5', '...', '>']
   * - BUT if this FOURTH page im hide the FIRST and SHOW SIXTH page ['<', '...', '2', '3', '4*', '5', '6', '...', '>']
   * */
  const slicedPages = () => {
    return pagesArray.slice(
      firstPageNumber >= pagesArray.length - numOfNearestPages
        ? pagesArray.length - numOfNearestPages
        : firstPageNumber,
      numOfNearestPages + firstPageNumber,
    );
  };

  const onChangePage = pageNumber => {
    if (pageNumber === currentPage) return;

    if (pageNumber > 3) {
      setFirstPageNumber(pageNumber - 3);
    } else {
      setFirstPageNumber(0);
    }

    setCurrentPage(pageNumber);
  };

  return (
    <Wrapper>
      {/* Arrow to previos page */}
      <Button
        disabled={currentPage === 1}
        onClick={() => onChangePage(currentPage - 1)}
        isLink={false}
      >
        <IoChevronBackOutline />
      </Button>

      {/* Go straight to first page */}
      {currentPage > 3 && paginationCount > numOfNearestPages && (
        <Button onClick={() => onChangePage(1)} isLink={false}>
          {'...'}
        </Button>
      )}

      {/* Map available pages */}
      {slicedPages().map((element, index) => (
        <Button
          key={index}
          onClick={() => onChangePage(element)}
          activeClass={element === currentPage}
          isLink={false}
        >
          {element}
        </Button>
      ))}

      {/* Go straight to last page */}
      {currentPage < paginationCount - 2 &&
        paginationCount > numOfNearestPages && (
          <Button onClick={() => onChangePage(paginationCount)} isLink={false}>
            {'...'}
          </Button>
        )}

      {/* Arrow to next page */}
      <Button
        disabled={currentPage === paginationCount}
        onClick={() => onChangePage(currentPage + 1)}
        isLink={false}
      >
        <IoChevronForwardOutline />
      </Button>
    </Wrapper>
  );
};
