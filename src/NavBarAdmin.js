import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { changeLanguage } from "./actions";

const NavBarAdmin = ({align, user, onChangeLanguage}) => {
    console.log(user);
  return (
    
    <nav className={align}>
      <ul>
        <li className="nav-auth">
          <Link to="/login">{user.length !== 0 ? "Logged in as " + user.email : "Login"}</Link>
        </li>
        <li>
          <button onClick={() => onChangeLanguage("Swedish")} className="language-swedish"></button>
        </li>
        <li>
          <button onClick={() => onChangeLanguage("English")} className="language-english"></button>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = state => ({
    user: state.user,
  });
  
  const mapDispatchToProps = dispatch => ({
    onChangeLanguage: language => dispatch(changeLanguage(language)),
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(NavBarAdmin);
