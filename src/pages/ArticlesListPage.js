import React from "react";
import ArticlesList from "../components/ArticlesList";
import articleContent from "./article-content";
import "../components/ArticlesList.css"

const ArticlesListPage = () => (
  <>
    <div id="page-body">
    <h1>Articles</h1>
    <ArticlesList articles={articleContent} />
    </div>
  </>
);

export default ArticlesListPage;
