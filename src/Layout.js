import React from "react";
import Home from "./Dashboard/Home";
import TheContent from "./TheContent";

function Layout() {
  return (
    <div>
      <Home />
      <div id="content">
        <TheContent />
      </div>
    </div>
  );
}

export default Layout;
