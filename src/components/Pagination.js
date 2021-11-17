import React, { useState } from "react";
import { usePostActions } from "../actions/postActions";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

export default function Pagination({ pageInfo }) {
  const [pageNumberLimit] = useState(2);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(2);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const { getPosts } = usePostActions();
  const pages = [];
  if (pageInfo.totalPages) {
    for (let i = 1; i <= pageInfo.totalPages; i++) {
      pages.push(i);
    }
  }

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <div key={number}>
          <button
            onClick={() => pageHandler(number)}
            className={`page-btn ${
              number === pageInfo.page ? "active-btn" : null
            }`}
          >
            {number}
          </button>
        </div>
      );
    } else {
      return null;
    }
  });
  const pageIncrementBtn = () => {
    setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
  };

  const pageDecrementBtn = () => {
    setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
    setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
  };

  const handleNextbtn = () => {
    getPosts({ page: pageInfo.nextPage });

    if (pageInfo.page + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const handlePrevbtn = () => {
    getPosts({ page: pageInfo.prevPage });

    if ((pageInfo.page - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  console.log(pageInfo.prevPage);
  const pageHandler = (page) => {
    getPosts({ page: page });
  };
  return (
    <>
      {pageInfo.totalPages && pageInfo.totalPages > 1 && (
        <div className="btn-container">
          {pageInfo.hasPrevPage && (
            <button onClick={handlePrevbtn} className="prev-btn">
              <FaChevronLeft />
            </button>
          )}
          {minPageNumberLimit >= 1 && (
            <button onClick={pageDecrementBtn} className="page-btn">
              ...
            </button>
          )}

          {renderPageNumbers}

          {pages.length > maxPageNumberLimit && (
            <button onClick={pageIncrementBtn} className="page-btn">
              ...
            </button>
          )}

          {pageInfo.hasNextPage && (
            <button onClick={handleNextbtn} className="next-btn">
              <FaChevronRight />
            </button>
          )}
        </div>
      )}
    </>
  );
}
