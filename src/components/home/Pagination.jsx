import { useEffect, useState } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import MediaQuery, { useMediaQuery } from 'react-responsive';

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
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

  const pagesToShow = isMobile ? 3 : 5;
  const centerNumber = Math.ceil(pagesToShow / 2);

  /**
   * If active page is 8 (for example), firstPageNumber = 6 - is leftmost button
   * ['<', '...', '6', '7', '8*', '9', '10', '...', '>']
   * The number of the active page is number with '*'
   */
  const [firstPageNumber, setFirstPageNumber] = useState(0);

  useEffect(() => {
    if (currentPage === 1) setFirstPageNumber(0);
  }, [currentPage]);

  /**
   * The number of nearest page buttons
   * ['<', '1', '2', '3', '4', '5', '>'] - arrows are not counted
   */
  const numOfNearestPages =
    paginationCount >= pagesToShow ? pagesToShow : paginationCount;

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

    if (pageNumber > centerNumber) {
      setFirstPageNumber(pageNumber - centerNumber);
    } else {
      setFirstPageNumber(0);
    }

    setCurrentPage(pageNumber);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
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

      <MediaQuery minWidth={600}>
        {/* Go straight to first page */}
        {currentPage > 3 && paginationCount > numOfNearestPages && (
          <Button onClick={() => onChangePage(1)} isLink={false}>
            {'...'}
          </Button>
        )}
      </MediaQuery>

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

      <MediaQuery minWidth={600}>
        {/* Go straight to last page */}
        {currentPage < paginationCount - 2 &&
          paginationCount > numOfNearestPages && (
            <Button
              onClick={() => onChangePage(paginationCount)}
              isLink={false}
            >
              {'...'}
            </Button>
          )}
      </MediaQuery>

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
