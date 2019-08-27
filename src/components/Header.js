import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const Header = () => {
  return (
    <div className="ui large menu">
      <div className="item">
        <h2>
          <Link to="/">Streamy</Link>
        </h2>
      </div>
      <div className="right menu">
        <div className="item">
          <Link to="/">All Streams</Link>
        </div>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
