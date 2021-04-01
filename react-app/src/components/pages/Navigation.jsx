import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation() {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            React App
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);
