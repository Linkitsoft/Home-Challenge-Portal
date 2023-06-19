import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "../../components/Sidebar";
import { toast } from "react-toastify";
import ArticleCards from "../../components/ArticleCard";
import DateFilter from "../../components/Modals/ArticleModals/dateFilter";
import ReactPaginate from "react-paginate";
import axios from "axios";
import fromDate from "../../components/fromDate";
import toDate from "../../components/toDate";
import moment from "moment";

const Articles = () => {
  const [modal, setModal] = useState("");
  const [source, setSource] = useState(1);
  const [dataToShow, setDataToShow] = useState([])
  const [dataToShow2, setDataToShow2] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [calenderDate, setCalenderDate] = useState("")
  const [category, setCategory] = useState("arts")
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const [loader, setLoader] = useState(false)

  // start month
  const startOfMonth = new Date(currentYear, currentMonth, 1);


  // Calculate the end date of the current month
  const startOfNextMonth = new Date(currentYear, currentMonth + 1, 1);
  // Calculate the end date of the current month
  const endOfMonth = new Date(startOfNextMonth.getTime() - 1);


  const handleSource = (e) => {
    setSource(e?.target?.value)
  }

  useEffect(() => {

    if (source == 1) {
      // NewYork-Times Api
      setLoader(true)
      axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${category}&begin_date=${fromDate(startDate ? startDate : startOfMonth)}&end_date=${toDate(endDate ? endDate : endOfMonth)}&page=${currentPage + 1}&api-key=6AQXiaitngsz6XUXYdJ1N3Ay6ADj5soO`)
        .then(response => {
          setLoader(false)
          setDataToShow(response?.data?.response?.docs)
        })
        .catch(error => {
        });
    } else if (source == 2) {
      // Guardians Api
      setLoader(true)
      axios.get(`https://content.guardianapis.com/search?q=${category}&page=${currentPage + 1}&from-date=${moment(startDate).format("YYYY-MM-DD")}&to-date=${moment(endDate).format("YYYY-MM-DD")}&api-key=4618d8df-d062-4a0d-81d5-9a8bf7bbead9`)
        .then(response => {
          setLoader(false)
          setDataToShow2(response?.data?.response?.results)
        })
        .catch(error => {
        });
    }
  }, [source, category, startDate, endDate, currentPage]);



  // new york times searching & filtering data 1
  const dataToShowFilter1 = useMemo(() => {
    let filteredArray = dataToShow;
    if (searchValue) {
      const searchTermLowerCase = searchValue.toLowerCase();
      filteredArray = filteredArray?.filter((user) =>
        user?.headline?.main?.toLowerCase().includes(searchTermLowerCase)
      );
    }
    return filteredArray;
  }, [searchValue, calenderDate, dataToShow]);



  // the guardians times searching & filtering data 2
  const dataToShowFilter2 = useMemo(() => {
    let filteredArray = dataToShow2;
    if (searchValue) {
      const searchTermLowerCase = searchValue.toLowerCase();
      filteredArray = filteredArray?.filter((user) =>
        user?.webTitle?.toLowerCase().includes(searchTermLowerCase)
      );
    }

    return filteredArray;
  }, [searchValue, calenderDate, dataToShow2]);


  return (
    <>
      <div>
        <div className="mainLayout">
          <Sidebar index={2} />
          {modal === "filter" && <DateFilter setModal={setModal} />}

          <div className="article">
            <div className="article_main">
              <div className="article_left">
                <p className="article_head">Articles</p>
                <input onChange={(e) => setSearchValue(e?.target?.value)} value={searchValue} type="text" placeholder="Search By Keyword" />
                <input type="text" placeholder="search category" value={category} onChange={(e) => setCategory(e.target.value)} />
              </div>

              <div className="article_right">
                <div>
                  <select value={source} onChange={(e) => handleSource(e)} >
                    <option value={""} disabled >Select Source</option>
                    <option value={1}>New York Times</option>
                    <option value={2}>The Guardians</option>
                  </select>
                  <input onChange={(e) => setStartDate(e?.target?.value)} type="date" value={startDate} />
                  <input onChange={(e) => setEndDate(e?.target?.value)} type="date" value={endDate} />

                </div>
              </div>
            </div>
            <div className="article_parent">
              {source == 1 && dataToShowFilter1?.map((item, index) => (
                <ArticleCards source={1} key={index} item={item} index={index} />
              ))}
              {source == 1 && loader && <h2>Loading...</h2>}

              {source == 2 && dataToShowFilter2?.map((arr, i) => {
                console.log("console=====>", (arr?.apiUrl))
                return (
                  <ArticleCards source={2} key={i} item={arr} index={i} />
                )
              })}

              {source == 2 && loader && <h2>Loading...</h2>}


              {/* {source === 2 && dataToShowFilter2?.map((item, index) =>
               (
                <ArticleCards key={index} item={item} index={index} />
              ))
              } */}
            </div>

            <div className="article_paginationWrapper">
              <div>
                <ReactPaginate
                  previousLabel="<"
                  nextLabel=">"
                  pageCount={source == 1 ? dataToShow?.length || 1 : dataToShow2?.length || 1}
                  activeClassName="active"
                  forcePage={currentPage}
                  onPageChange={(page) =>
                    setCurrentPage(page.selected)
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

export default Articles;
