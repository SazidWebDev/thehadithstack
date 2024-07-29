import React from 'react';
import { useRouter } from 'next/router';

const Pagination = ({ currentPage, lastPage, links, onPageChange }) => {
  const router = useRouter();
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= lastPage;

  const handlePageChange = (page) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page },
    });
    if (onPageChange) {
    onPageChange(page);
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-center space-x-2 space-y-2 select-none">
      <button
        onClick={() => !isFirstPage && handlePageChange(currentPage - 1)}
        className={`px-3 py-1 disabled:opacity-50 border duration-200 rounded bg-zinc-900 text-white border-red-500 hover:bg-red-500 ${
          isFirstPage ? 'pointer-events-none opacity-50' : ''
        }`}
        disabled={isFirstPage}
      >
        &laquo; Previous
      </button>
      {links.map((link, index) => {
        if (link.label === '...') {
          return (
            <span key={index} className="px-2 py-1">
              {link.label}
            </span>
          );
        }

        return (
          (link.label && link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;') ? (
            <button
              key={index}
              onClick={() => handlePageChange(parseInt(link.label, 10))}
              className={`px-3 py-1 border duration-200 rounded ${
                link.active
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-zinc-900 text-white border-red-500 hover:bg-red-500'
              }`}
            >
              {link.label}
            </button>
          ) : null
        );
      })}
      <button
        onClick={() => !isLastPage && handlePageChange(currentPage + 1)}
        className={`px-3 py-1 border duration-200 rounded bg-zinc-900 text-white border-red-500 hover:bg-red-500 ${
          isLastPage ? 'pointer-events-none opacity-50' : ''
        }`}
        disabled={isLastPage}
      >
        Next &raquo;
      </button>
    </div>
  );
};

export default Pagination;
