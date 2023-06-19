import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "../../components/Sidebar";
import { toast } from "react-toastify";
import ArticleCards from "../../components/TheGuardianCard";
import DateFilter from "../../components/Modals/ArticleModals/dateFilter";
import ReactPaginate from "react-paginate";
import axios from "axios";
import fromDate from "../../components/fromDate";
import toDate from "../../components/toDate";
import moment from "moment";
import NewYorkCard from "../../components/NewYorkCard";
import TheGuardianCard from "../../components/TheGuardianCard";

const Articles = () => {
  const [modal, setModal] = useState("");
  const [source, setSource] = useState(3);
  const [dataToShow, setDataToShow] = useState([]);
  const [dataToShow2, setDataToShow2] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("arts");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const [loader1, setLoader1] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [osama, setOsama] = useState([]);
  const [dataToShow3, setDataToShow3] = useState([]);
  const [dataToShow4, setDataShow4] = useState([]);

  // start month
  const startOfMonth = new Date(currentYear, currentMonth, 1);

  // Calculate the end date of the current month
  const startOfNextMonth = new Date(currentYear, currentMonth + 1, 1);
  // Calculate the end date of the current month
  const endOfMonth = new Date(startOfNextMonth.getTime() - 1);

  const handleSource = (e) => {
    setSource(e?.target?.value);
  };

  useEffect(() => {
    if (source == 1) {
      // NewYork-Times Api
      axios
        .get(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${category}&begin_date=${fromDate(
            startDate ? startDate : startOfMonth
          )}&end_date=${toDate(endDate ? endDate : endOfMonth)}&page=${
            currentPage + 1
          }&api-key=6AQXiaitngsz6XUXYdJ1N3Ay6ADj5soO`
        )
        .then((response) => {
          setDataToShow(response?.data?.response?.docs);
          setLoader2(!loader1);
        })
        .catch((error) => {});
    } else if (source == 2) {
      // Guardians Api
      axios
        .get(
          `https://content.guardianapis.com/search?q=${category}&page=${
            currentPage + 1
          }&from-date=${moment(startDate ? startDate : startOfMonth).format(
            "YYYY-MM-DD"
          )}&to-date=${moment(endDate ? endDate : endOfMonth).format(
            "YYYY-MM-DD"
          )}&api-key=4618d8df-d062-4a0d-81d5-9a8bf7bbead9`
        )
        .then((response) => {
          setDataToShow2(response?.data?.response?.results);
          setLoader2(!loader1);
        })
        .catch((error) => {});
    } else if (source == 3) {
      // All data
      // NewYork-Times Api
      axios
        .get(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${category}&begin_date=${fromDate(
            startDate ? startDate : startOfMonth
          )}&end_date=${toDate(endDate ? endDate : endOfMonth)}&page=${
            currentPage + 1
          }&api-key=6AQXiaitngsz6XUXYdJ1N3Ay6ADj5soO`
        )
        .then((response) => {
          setDataToShow3(response?.data?.response?.docs);
          setLoader2(!loader1);
        })
        .catch((error) => {});

      // Guardians Api
      axios
        .get(
          `https://content.guardianapis.com/search?q=${category}&page=${
            currentPage + 1
          }&from-date=${moment(startDate ? startDate : startOfMonth).format(
            "YYYY-MM-DD"
          )}&to-date=${moment(endDate ? endDate : endOfMonth).format(
            "YYYY-MM-DD"
          )}&api-key=4618d8df-d062-4a0d-81d5-9a8bf7bbead9`
        )
        .then((response) => {
          setDataShow4(response?.data?.response?.results);
          setLoader2(!loader1);
        })
        .catch((error) => {});
    }
  }, [source, category, startDate, endDate, currentPage]);

  useEffect(() => {
    if (source == 1) {
      const temp = dataToShow;
      const state = searchValue
        ? dataToShow?.filter((user) =>
            user?.headline?.main
              ?.toLowerCase()
              .includes(searchValue?.toLowerCase())
          )
        : temp;
      setOsama(state);
    } else if (source == 2) {
      const temp = dataToShow2;
      const state = searchValue
        ? dataToShow2?.filter((user) =>
            user?.webTitle?.toLowerCase().includes(searchValue?.toLowerCase())
          )
        : temp;
      setOsama(state);
    } else if (source == 3) {
      const temp = dataToShow;
      const state = searchValue
        ? dataToShow?.filter((user) =>
            user?.headline?.main
              ?.toLowerCase()
              .includes(searchValue?.toLowerCase())
          )
        : temp;
      setDataToShow3(state);

      const temp2 = dataToShow2;
      const state2 = searchValue
        ? dataToShow2?.filter((user) =>
            user?.webTitle?.toLowerCase().includes(searchValue?.toLowerCase())
          )
        : temp2;
      setDataShow4(state2);
    }
  }, [searchValue]);

  useEffect(() => {
    if (dataToShow || dataToShow2) {
      if (source == 1) {
        setOsama(dataToShow);
      } else if (source == 2) {
        setOsama(dataToShow2);
      } else if (source == 3) {
        setDataToShow3(dataToShow3);
        setDataShow4(dataToShow4);
      }
    }
  }, [source, dataToShow, dataToShow2, dataToShow3, dataToShow4]);

  console.log("dataToShow3", dataToShow3);
  console.log("dataToShow4", dataToShow4);

  return (
    <>
      <div>
        <div className="mainLayout">
          <Sidebar index={2} />
          {modal === "filter" && <DateFilter setModal={setModal} />}

          <div className="article">
            <div className="article_main">
              <div className="article_left">
                <p className="article_head">Articles & News Feed</p>
                <div className="article_lableSection">
                  <p>Search By Title</p>
                  <input
                    onChange={(e) => setSearchValue(e?.target?.value)}
                    value={searchValue}
                    type="text"
                    placeholder="Search"
                  />
                </div>

                {/* <input
                  type="text"
                  placeholder="search category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                /> */}

                <div className="article_lableSection">
                  <p>Select Category</p>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option disabled value="">
                      Select Category
                    </option>
                    <option value="war">war</option>
                    <option value="politics">politics</option>
                    <option value="education">education</option>
                    <option value="health">health</option>
                    <option value="economy">economy</option>
                    <option value="sport">sport</option>
                  </select>
                </div>
              </div>

              <div className="article_right">
                <div className="article_lableSection">
                  <p>Select Source</p>
                  <select value={source} onChange={(e) => handleSource(e)}>
                    <option value={""} disabled>
                      Select Source
                    </option>
                    <option value={3}>All</option>
                    <option value={1}>New York Times</option>
                    <option value={2}>The Guardians</option>
                  </select>
                </div>
                <div className="article_lableSection">
                  <p>Pick Start Date</p>
                  <input
                    onChange={(e) => setStartDate(e?.target?.value)}
                    type="date"
                    value={startDate}
                  />
                </div>
                <div className="article_lableSection">
                  <p>Pick End Date</p>
                  <input
                    onChange={(e) => setEndDate(e?.target?.value)}
                    type="date"
                    value={endDate}
                  />
                </div>
              </div>
            </div>
            <div className="article_parent">
              {/* {source == 1 && dataToShowFilter1?.length !== 0 ? (
                dataToShowFilter1?.map((item, index) => (
                  <ArticleCards
                    source={1}
                    key={index}
                    item={item}
                    index={index}
                  />
                ))
              ) : (
                <h2>No Data Found</h2>
              )} */}
              {source == 1 &&
                (osama?.length == 0 ? (
                  <h2>No Data Found</h2>
                ) : (
                  osama?.map((item, index) => {
                    return (
                      <NewYorkCard key={index} item={item} index={index} />
                    );
                  })
                ))}

              {source == 2 &&
                (osama?.length == 0 ? (
                  <h2>No Data Found</h2>
                ) : (
                  osama?.map((arr, i) => {
                    return <TheGuardianCard key={i} item={arr} index={i} />;
                  })
                ))}

              {/* All */}
              {source == 3 &&
                dataToShow3?.map((item, index) => {
                  return <NewYorkCard key={index} item={item} index={index} />;
                })}

              {source == 3 &&
                dataToShow4?.map((arr, i) => {
                  return <TheGuardianCard key={i} item={arr} index={i} />;
                })}

              {/* All End */}
            </div>

            <div className="article_paginationWrapper">
              <div>
                <ReactPaginate
                  previousLabel="<"
                  nextLabel=">"
                  pageCount={
                    source == 1
                      ? dataToShow?.length || 1
                      : dataToShow2?.length || 1 && source == 3 ? dataToShow4?.length + dataToShow3?.length : 1
                  }
                  activeClassName="active"
                  forcePage={currentPage}
                  onPageChange={(page) => setCurrentPage(page.selected)}
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

export default Articles;
