// ---------------------------------------------------------
// Author: Neha Shaikh
// Description: Header for component pages.
// Version: 1.0
// ---------------------------------------------------------

import React, { PureComponent } from "react";
import { Button } from "react-bootstrap";

export class Header extends PureComponent {
  render() {
    return (
      <div className="m-2 align-items-center">
        <h1>Blona</h1>

        <hr></hr>
      </div>
    );
  }
}

export default Header;
