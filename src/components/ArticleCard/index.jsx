import React, { useState } from "react";
import { toast } from "react-toastify";

const ArticleCards = ({ item, source }) => {
  // handle link new york
  const handleLink = () => {
    window.open(item?.web_url);
  };

  // handle link the guardians
  const handleGuardians = () => {
    window.open(item?.webUrl);
  };

  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={source == 2 ? handleGuardians : handleLink}
      className="article_all"
    >
      {source == 2 ? (
        <div className="article_content">
          <div className="article_layout">
            <div className="article_top">
              <div className="circle">
                <i className="fas fa-save"></i>
              </div>
              {/* <p>Article #{item.id}</p> */}
            </div>
            <div className="corner">
              <p>{item?.webPublicationDate}</p>
            </div>
          </div>
          <p className="article_title">{item?.webTitle}</p>
          <p className="article_desc">{item?.description}</p>
          <div className="article_bottom">
            <p className="name"> Type : {item?.type}</p>
            {/* <p className="role">{item.designation}</p> */}
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default ArticleCards;
