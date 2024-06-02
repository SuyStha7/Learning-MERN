import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      {/* outlet bhaneko jun page lai hit garyaxa tyo page display hunxa wa render hunxa */}
      <Footer />
    </>
  );
};

export default Layout;
