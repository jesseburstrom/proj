import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogInPage from "./auth/LogInPage";
import SignUpPage from "./auth/SignUpPage";
import HomePage from "./portfolio/HomePage";
import HomePageSWE from "./portfolio/HomePageSWE";

//import { UserInfoPage } from "./pages/UserInfoPage";
import Flutter from "./flutter/Flutter";
import PrivateRoute  from "./auth/PrivateRoute";
import  BrickGame  from "./brickgame/BrickGame";
import Meme from "./meme/Meme";
import NotFoundPage from "./blog/pages/NotFoundPage";
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
      <div className="nav-layout">
        <div className="NavBox">
          <NavBar align="nav-left" />
          <NavBarAdmin align="nav-right" />
        </div>
      </div>
      
      <div className="page-container">
        <Routes> 
          {language === "Swedish" ?
          <Route path="/" element={<HomePageSWE />} exact />
          :
          <Route path="/" element={<HomePage />} exact />
            
          }
          
          <Route path="/flutter-app" element={<Flutter />} />
          
          <Route path="/brickgame" element={<PrivateRoute component={BrickGame} />} />
                      
          <Route path="/flutter-app" element={<Flutter />} />
          
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
