import React from "react";
import { Outlet } from "react-router-dom";
import { SideMenu } from "./SideMenu";

export const Content = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <SideMenu />

          {/* CONTENT TO BE DISBLAYED */}
          <Outlet />
        </div>
      </div>
    </>
  );
};
