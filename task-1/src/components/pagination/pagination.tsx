import { useState } from 'react';
import { Link } from 'react-router-dom';

interface PaginationProps {
  totalPages: number;
  buttonsCount: number;
}

function getNumbersRange(
  current: number,
  length: number,
  totalPages: number
): number[] {
  const len = totalPages > length ? length : totalPages;
  const halfStepsFromCurrent =
    current - Math.floor(len / 2);

  let start =
    halfStepsFromCurrent > 0 ? halfStepsFromCurrent : 1;
  let end = start + len;
  const difference = totalPages - end;
  if (difference < 0) {
    end = totalPages;
    start = totalPages - len + 1;
  }

  return Array.from({ length: len }, (_, i) => start + i);
}

export const Pagination = (props: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { buttonsCount, totalPages } = props;

  const range = getNumbersRange(
    currentPage,
    buttonsCount,
    totalPages
  );

  const prev = currentPage - 1 > 0 ? currentPage - 1 : 1;
  const next =
    currentPage + 1 < totalPages
      ? currentPage + 1
      : totalPages;
  return (
    <div className='pagination'>
      <Link
        to={`/${prev}`}
        onClick={() => {
          setCurrentPage(prev);
        }}
      >
        ⇦
      </Link>
      <div className='numeric-btns'>
        {range.map((n) => (
          <Link
            onClick={() => {
              setCurrentPage(n);
            }}
            key={n}
            to={`/${n}`}
          >
            {n}
          </Link>
        ))}
      </div>
      <Link
        to={`/${next}`}
        onClick={() => {
          setCurrentPage(next);
        }}
      >
        ⇨
      </Link>
    </div>
  );
};
