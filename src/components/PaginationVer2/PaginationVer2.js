import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

function PaginationVer2({ list = [], setRenderList, itemPerPage = 20 }) {
  const [maxPage, setMaxPage] = useState(0);
  const [page, setPage] = useState(1);

  const handlePageChange = (e) => {
    const target = e.target.closest(".page");
    setPage(target.dataset.id);
  };
  useEffect(() => {
    const lastSelect = document.querySelector(".page-index.active");
    console.log(lastSelect);
    const currentSelect = document.querySelector(
      `.page-index[data-id='${page}']`
    );
    lastSelect?.classList.remove("active");
    currentSelect?.classList.add("active");
  }, [page]);

  useEffect(() => {
    const endItem = page * itemPerPage;
    const startItem = endItem - itemPerPage;
    console.log(endItem, startItem);
    setRenderList(list.slice(startItem, endItem));
  }, [page, list, itemPerPage, setRenderList]);

  useEffect(() => {
    setMaxPage(Math.ceil(list.length / itemPerPage));
  }, [list, itemPerPage]);

  // const endItem = page*itemPerPage;
  // const startItem = endItem-itemPerPage
  // const currentPage = lists.slice(startItem, endItem)
  // setLists(currentPage)

  return (
    <>
      <div className="table"></div>
      <div className="pagination-containt">
        <FontAwesomeIcon
          className="prev-page page page-arrow "
          icon={faCaretLeft}
          data-id={page > 1 ? Number(page) - 1 : page}
          onClick={(e) => handlePageChange(e)}
        />

        <div className="pagination-number">
          {maxPage < 11 ? (
            <>
              {maxPage > 1 && (
                <>
                  <div
                    className="page-index page active"
                    data-id={1}
                    onClick={(e) => handlePageChange(e)}
                  >
                    1
                  </div>
                  <div
                    className="page-index page"
                    data-id={2}
                    onClick={(e) => handlePageChange(e)}
                  >
                    2
                  </div>
                </>
              )}
              {maxPage > 2 && (
                <>
                  <div
                    className="page-index page"
                    data-id={3}
                    onClick={(e) => handlePageChange(e)}
                  >
                    3
                  </div>
                </>
              )}
              {maxPage > 3 && (
                <>
                  <div
                    className="page-index page"
                    data-id={4}
                    onClick={(e) => handlePageChange(e)}
                  >
                    4
                  </div>
                </>
              )}
              {maxPage > 4 && (
                <>
                  <div
                    className="page-index page"
                    data-id={5}
                    onClick={(e) => handlePageChange(e)}
                  >
                    5
                  </div>
                </>
              )}
              {maxPage > 5 && (
                <>
                  <div
                    className="page-index page"
                    data-id={6}
                    onClick={(e) => handlePageChange(e)}
                  >
                    6
                  </div>
                </>
              )}
              {maxPage > 6 && (
                <>
                  <div
                    className="page-index page"
                    data-id={7}
                    onClick={(e) => handlePageChange(e)}
                  >
                    7
                  </div>
                </>
              )}
              {maxPage > 7 && (
                <>
                  <div
                    className="page-index page"
                    data-id={8}
                    onClick={(e) => handlePageChange(e)}
                  >
                    8
                  </div>
                </>
              )}
              {maxPage > 8 && (
                <>
                  <div
                    className="page-index page"
                    data-id={9}
                    onClick={(e) => handlePageChange(e)}
                  >
                    9
                  </div>
                </>
              )}
              {maxPage > 9 && (
                <>
                  <div
                    data-id={10}
                    className="page-index page"
                    onClick={(e) => handlePageChange(e)}
                  >
                    10
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div
                className="page-index page active"
                data-id={1}
                onClick={(e) => handlePageChange(e)}
              >
                1
              </div>
              <div
                className="page-index page"
                data-id={2}
                onClick={(e) => handlePageChange(e)}
              >
                2
              </div>
              {page > 5 && <div className="page-space">...</div>}
              {page >= 5 && page !== maxPage ? (
                <>
                  <div
                    className="page-index page"
                    data-id={page - 2}
                    onClick={(e) => handlePageChange(e)}
                  >
                    {page - 2}
                  </div>
                  <div
                    className="page-index page"
                    data-id={page - 1}
                    onClick={(e) => handlePageChange(e)}
                  >
                    {page - 1}
                  </div>
                </>
              ) : (
                page === 4 && (
                  <div
                    className="page-index page"
                    data-id={page - 1}
                    onClick={(e) => handlePageChange(e)}
                  >
                    {page - 1}
                  </div>
                )
              )}
              {page < maxPage - 1 && page > 2 && (
                <div className="page-index page">{page}</div>
              )}

              {page <= maxPage - 4 && page >= 2 && (
                <>
                  <div
                    className="page-index page"
                    data-id={page + 1}
                    onClick={(e) => handlePageChange(e)}
                  >
                    {page + 1}
                  </div>
                  <div
                    className="page-index page"
                    data-id={page + 2}
                    onClick={(e) => handlePageChange(e)}
                  >
                    {page + 2}
                  </div>
                </>
              )}

              {page < maxPage - 4 && <div className="page-space">...</div>}
              {page === maxPage - 3 && (
                <div
                  className="page-index page"
                  data-id={page + 1}
                  onClick={(e) => handlePageChange(e)}
                >
                  {page + 1}
                </div>
              )}
              <div
                className="page-index page"
                data-id={page - 1}
                onClick={(e) => handlePageChange(e)}
              >
                {maxPage - 1}
              </div>
              <div
                className="page-index page"
                data-id={maxPage}
                onClick={(e) => handlePageChange(e)}
              >
                {maxPage}
              </div>
            </>
          )}
        </div>

        <FontAwesomeIcon
          className="next-page page page-arrow"
          icon={faCaretRight}
          data-id={page < maxPage ? Number(page) + 1 : page}
          onClick={(e) => handlePageChange(e)}
        />
      </div>
    </>
  );
}

export default PaginationVer2;
