import React, { useRef, useEffect } from "react";
import UseOutsideAlerter from "../../ClickOutside/ClickOutside";
import { toast } from "react-toastify";

const CustomizeNewsFeed = ({ setModal }) => {
  const dateFilterRef = useRef();
  const dateFilterRef2 = useRef();

  useEffect(() => {
    UseOutsideAlerter(dateFilterRef, dateFilterRef2, setModal);
    // eslint-disable-next-line
  }, []);

  const handleApply = () => {
    setModal("");
    toast.success("News Feed Updated");
  };

  return (
    <div>
      <div ref={dateFilterRef} className="dateFilter">
        <div ref={dateFilterRef2} className="dateFilter_inner">
          <div className="dateFilter_topHead">
            <p>News Feed</p>
          </div>
          <div className="dateFilter_wrapper">
            <div className="dateFilter_selectWrap">
              <p>Sources</p>
              <select>
                <option>All</option>
              </select>
            </div>

            <div className="dateFilter_selectWrap">
              <p>Categories</p>
              <select>
                <option>All</option>
              </select>
            </div>

            <div className="dateFilter_selectWrap">
              <p>Authors</p>
              <select>
                <option>All</option>
              </select>
            </div>

            <div className="dateFilter_reset">
              <div>{/* <p>Reset</p> */}</div>

              <div>
                <button onClick={() => handleApply()} className="shadow">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeNewsFeed;
