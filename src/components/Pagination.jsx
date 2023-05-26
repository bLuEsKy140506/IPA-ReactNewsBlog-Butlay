import ReactPaginate from "react-paginate";
import React, { useState } from "react";
import { Items } from "../pages/PostedBlog";
import "../pages/PostedBlog.css";
import "./Pagination.css";
import "../App.css";

export default function PaginatedItems({ itemsPerPage, arrayObject }) {
  const items = arrayObject;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="post-grid">
        <Items currentItems={currentItems} />
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel="OLDEST >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< LATEST"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </>
  );
}
