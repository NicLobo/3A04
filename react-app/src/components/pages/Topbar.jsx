import React from "react";
import { Link, withRouter } from "react-router-dom";

function Topbar() {
  return (
    <div className="top-bar">
      <nav className="navbar navbar-expand navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Shipwreck! 
            <i class="fas fa-space-shuttle ml-2"></i>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Topbar);
