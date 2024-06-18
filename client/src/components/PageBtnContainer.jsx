import React from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";

function PageBtnContainer() {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext();

  let pages = [];
  for (var i = 0; i < numOfPages; i++) {
    pages.push(i + 1);
  }

  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageBtn = ({ x, activeClass }) => {
    console.log(x);
    return (
      <button
        key={x}
        className={`btn page-btn ${activeClass && "active"} `}
        onClick={() => {
          handlePageChange(x);
        }}
      >
        {x}
      </button>
    );
  };

  const renderPageBtns = () => {
    const pageBtn = [];
    if (currentPage >= 1) {
      pageBtn.push(addPageBtn({ x: 1, activeClass: currentPage === 1 }));
    }
    if (currentPage > 3) {
      pageBtn.push(
        <span className="page-btn dots" key="dots-1">
          ....
        </span>
      );
    }

    if (currentPage !== 1 && currentPage !== 2) {
      pageBtn.push(addPageBtn({ x: currentPage - 1, activeClass: false }));
    }
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageBtn.push(addPageBtn({ x: currentPage, activeClass: true }));
    }
    if (currentPage !== numOfPages - 1 && currentPage !== numOfPages) {
      pageBtn.push(addPageBtn({ x: currentPage + 1, activeClass: false }));
    }
    if (currentPage < numOfPages - 2) {
      pageBtn.push(
        <span className=" page-btn dots" key="dots+1">
          ....
        </span>
      );
    }
    if (currentPage <= numOfPages) {
      pageBtn.push(
        addPageBtn({ x: numOfPages, activeClass: currentPage === numOfPages })
      );
    }
    return pageBtn;
  };
  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = numOfPages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        Prev
      </button>
      <div className="btn-container"></div>
      {renderPageBtns()}
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
}

export default PageBtnContainer;
