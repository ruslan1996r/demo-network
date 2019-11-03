import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

const Header = props => {
  return (
    <header className={s.header}>
      <img
        src="https://www.stickpng.com/assets/images/58486a72849cf46a2a931338.png"
        alt="pepe"
      />
      <div className={s.loginBlock}>
        {props.isAuth ? (
          <div>
            {props.login} - <button onClick={props.logout}>Log out</button>
          </div>
        ) : (
          <NavLink to={"/login"}>login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
