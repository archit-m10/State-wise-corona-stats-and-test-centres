import React from "react";
import AppBar from "@material-ui/core/AppBar";
import classNames from "classnames/bind";
const cx = classNames.bind(require("./appHeader.module.css"));
const AppHeader = props => {
  const { news } = props;
  return (
    <>
      <AppBar
        position="relative"
        className={cx("app-header")}
        color="primary"
        style={{ backgroundColor: "#efefef" }}
      >
        
          <img
            className={cx("logo")}
            src="./Surakshacovid19 logo.png"
            alt="Surakshacovid19 logo"
            height={90}
         
          />
       
      </AppBar>
    </>
  );
};
export default AppHeader;
