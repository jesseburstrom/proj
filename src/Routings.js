import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogInPage from "./auth/LogInPage";
import SignUpPage from "./auth/SignUpPage";
import HomePage from "./portfolio/HomePage";
import HomePageSWE from "./portfolio/HomePageSWE";

//import { UserInfoPage } from "./pages/UserInfoPage";
import PrivateRoute  from "./auth/PrivateRoute";
import  BrickGame  from "./brickgame/BrickGame";
import Meme from "./meme/Meme";
import ArticlesListPage from "./blog/pages/ArticlesListPage";
import ArticlePage from "./blog/pages/ArticlePage";
import NotFoundPage from "./blog/pages/NotFoundPage";
import TodoList from "./todos/TodoList";
import NavBar from "./NavBar";
import NavBarAdmin from "./NavBarAdmin";
import "./App.css";
import { connect } from "react-redux";
import {
    getLanguage,
  } from "./selectors";
  import {
    changeLanguage,
  } from "./actions";

function Routings({language, onChangeLanguage}) {
  return (
    <Router>
      <div className="App"  >
        <div className="nav-layout">
          <div className="NavBox">
            <NavBar align="nav-left" />
            <NavBarAdmin align="nav-right" />
          </div>
        </div>
        
        <Routes> 
          {language === "Swedish" ?
          <Route path="/" element={<HomePageSWE />} exact />
          :
          <Route path="/" element={<HomePage />} exact />
            
        }
          
          <Route path="/brickgame" element={<PrivateRoute component={BrickGame} />} />
            
          <Route path="/todos" element={<PrivateRoute component={TodoList} />} />
          
          <Route path="/articles-list" element={<PrivateRoute component={ArticlesListPage} />} />
          <Route path="/article/:name" element={<PrivateRoute component={ArticlePage} />} />
          
          <Route path="/meme" element={<Meme />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  language: getLanguage(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChangeLanguage: (language) => dispatch(changeLanguage(language)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Routings);
