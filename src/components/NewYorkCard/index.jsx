import React, { useState } from "react";
import { toast } from "react-toastify";

const NewYorkCard = ({ item }) => {
  // handle link new york
  const handleLink = () => {
    window.open(item?.web_url);
  };

  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={handleLink}
      className="article_all"
    >
      <div className="article_content">
        <div className="article_layout">
          <div className="article_top">
            <div className="circle">
              <i className="fas fa-save"></i>
            </div>
            {/* <p>Article #{item.id}</p> */}
          </div>
          <div className="corner">
            <p>{item?.pub_date}</p>
          </div>
        </div>
        <p className="article_title">{item?.headline?.main}</p>
        <p className="article_desc">{item?.abstract}</p>
        <div className="article_bottom">
          <p className="name"> Author : {item?.source}</p>
          {/* <p className="role">{item.designation}</p> */}
        </div>
      </div>
    </div>
  );
};

export default NewYorkCard;
