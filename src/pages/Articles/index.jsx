import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "../../components/Sidebar";
import { toast } from "react-toastify";
import ArticleCards from "../../components/ArticleCard";
import { useDispatch, useSelector } from "react-redux";
import DateFilter from "../../components/Modals/ArticleModals/dateFilter";
import ReactPaginate from "react-paginate";
import axios from "axios";
import fromDate from "../../components/fromDate";
import toDate from "../../components/toDate";

const Articles = () => {
  const [modal, setModal] = useState("");
  const [source, setSource] = useState(1);
  const [dataToShow, setDataToShow] = useState([])
  const [dataToShow2, setDataToShow2] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [calenderDate, setCalenderDate] = useState("")
  const [category, setCategory] = useState("arts")
  const [page, setPage] = useState("1")
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("")
  const [currentPage , setCurrentPage] = useState(1)
  // const { ArticleData } = useSelector((data) => data.articles);


  // const getNews =  () => {
  //   fetch("https://rss.nytimes.com/services/xml/rss/nyt/Arts.xml")
  // .then(response => response.text())
  // .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  // .then(data => console.log(data))
  // }


  const handleSource = (e) => {
    setSource(e?.target?.value)
    console.log(e?.target?.value)
  }

  // getNews()
  useEffect(() => {

    if (source == 1) {
      console.log("category", category)
      // NewYork-Times Api
      // axios.get(`https://api.rss2json.com/v1/api.json?rss_url=https://rss.nytimes.com/services/xml/rss/nyt/${category}.xml`)
      axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${category}&begin_date=${fromDate(startDate)}&end_date=${toDate(endDate)}&api-key=6AQXiaitngsz6XUXYdJ1N3Ay6ADj5soO      `)
        .then(response => {
          setDataToShow(response?.data?.response?.docs)
          console.log("NewYork-Times", response?.data?.response?.docs)
          // Set the fetched data to feedData state
        })
        .catch(error => {
          console.error('Error fetching RSS feed:', error);
        });
    } else if (source == 2) {
      // Guardians Api
      // axios.get(`https://content.guardianapis.com/search?q=${category}&from-date=2015-01-01&api-key=4618d8df-d062-4a0d-81d5-9a8bf7bbead9`)
      axios.get(`https://content.guardianapis.com/search?page=${page}&q=debate&tag=politics/politics&from-date=2017-01-01&api-key=4618d8df-d062-4a0d-81d5-9a8bf7bbead9`)
        .then(response => {
          console.log("Guardians response", response?.data?.response?.results)
          setDataToShow2(response?.data?.response?.results)
          // Set the fetched data to feedData state
        })
        .catch(error => {
          console.error('Error fetching RSS feed:', error);
        });
    }
  }, [source, category , startDate , endDate, currentPage]);



  // new york times searching & filtering data 1
  const dataToShowFilter1 = useMemo(() => {
    let filteredArray = dataToShow;
    if (searchValue) {
      const searchTermLowerCase = searchValue.toLowerCase();
      filteredArray = filteredArray?.filter((user) =>
        user?.headline?.main?.toLowerCase().includes(searchTermLowerCase)
      );
    }

    // if (calenderDate) {
    //   filteredArray = filteredArray?.filter((item) => {
    //     const itemDate = new Date(item.pub_date);
    //     const toDateObj = new Date(calenderDate);
    //     return (
    //       (itemDate >= toDateObj && itemDate <= toDateObj) ||
    //       itemDate.toDateString() === toDateObj.toDateString()
    //     );
    //   });
    // }

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

    if (calenderDate) {
      filteredArray = filteredArray?.filter((item) => {
        const itemDate = new Date(item.webPublicationDate);
        const toDateObj = new Date(calenderDate);
        return (
          (itemDate >= toDateObj && itemDate <= toDateObj) ||
          itemDate.toDateString() === toDateObj.toDateString()
        );
      });
    }

    return filteredArray;
  }, [searchValue, calenderDate, dataToShow2]);


  return (
    <>
      <div>
        <div className="mainLayout">
          <Sidebar index={2} />
          {modal === "filter" && <DateFilter setModal={setModal} />}
          {/* <iframe width="100%" height="1600" src="https://rss.app/embed/v1/wall/_L7YmWejHFg80wJDE" frameborder="0"></iframe> */}

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

                  {/* <button
                    onClick={() => setModal("filter")}
                    className="article_create"
                  >
                    Filter
                  </button> */}
                </div>
              </div>
            </div>
            <div className="article_parent">
              {source == 1 && dataToShowFilter1?.map((item, index) => (
                <ArticleCards source={1} key={index} item={item} index={index} />
              ))}

              {source == 1 && dataToShowFilter1?.length === 0 && <h2>Data Not Found</h2>}

              {source == 2 && dataToShowFilter2?.map((arr, i) => {
                console.log("console=====>", (arr?.apiUrl))
                return (
                  <ArticleCards source={2} key={i} item={arr} index={i} />
                )
              })}

              {source == 2 && dataToShowFilter2?.length === 0 && <h2>Data Not Found</h2>}


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
                  pageCount={dataToShow2?.length || 1}
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
