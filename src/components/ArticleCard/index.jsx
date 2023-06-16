import React, { useState } from "react";
import { toast } from "react-toastify";

const ArticleCards = ({ item }) => {
  return (
    <div className="article_all">
      <div className="article_content">
        <div className="article_layout">
          <div className="article_top">
            <div className="circle">
              <i className="fas fa-save"></i>
            </div>
            <p>Article #{item.id}</p>
          </div>
          <div className="corner">
            <p>2023-11-10</p>
          </div>
        </div>
        <p className="article_title">{item.title}</p>
        <p className="article_desc">{item.description}</p>
        <div className="article_bottom">
          <p className="name">{item.author}</p>
          <p className="role">{item.designation}</p>
        </div>
      </div>
    </div>
  );
};

export default ArticleCards;
