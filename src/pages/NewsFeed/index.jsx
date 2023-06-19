import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { toast } from "react-toastify";
// import ArticleCards from "../../components/ArticleCard";
import { useDispatch, useSelector } from "react-redux";
import CustomizeNewsFeed from "../../components/Modals/ArticleModals/customizeNewsFeed";
import ReactPaginate from "react-paginate";
// import NewsFeedCard from "../../components/NewsFeedCard";

const NewsFeed = () => {
  const [modal, setModal] = useState("");
  const [values, setValues] = useState({});

  const dispatch = useDispatch();
  const { ArticleData } = useSelector((data) => data.articles);
  const { role } = useSelector((data) => data.roles);
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const countButtons = Math?.ceil(count / 25);

  return (
    <>
      <div>
        <div className="mainLayout">
          <Sidebar index={1} />
          {modal === "filter" && <CustomizeNewsFeed setModal={setModal} />}
          <div className="article">
            <div className="article_main">
              <div className="article_left">
                <p className="article_head">News Feed</p>
                <input type="text" placeholder="Search By Keyword" />
              </div>
              <div className="article_right">
                <div>
                  <button
                    onClick={() => setModal("filter")}
                    className="article_create"
                  >
                    Customize
                  </button>
                </div>
              </div>
            </div>
            <div className="article_parent">
              {/* {ArticleData.map((item, index) => (
                <NewsFeedCard
                  key={index}
                  item={item}
                  index={index}
                />
              ))} */}
            </div>
            <div className="article_paginationWrapper">
              <div>
                <ReactPaginate
                  previousLabel="<"
                  nextLabel=">"
                  pageCount={countButtons || 1}
                  activeClassName="active"
                  forcePage={currentPage}
                  onPageChange={(page) =>
                    dispatch(setCurrentPage(page.selected))
                  }
                  pageClassName="page-item"
                  nextClassName="page-item next"
                  nextLinkClassName="page-link"
                  previousClassName="page-item prev"
                  previousLinkClassName="page-link"
                  pageLinkClassName="page-link"
                  containerClassName="pagination react-paginate justify-content-end my-2 pr-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsFeed;
