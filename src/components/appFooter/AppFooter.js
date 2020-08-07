import React from "react";
import classNames from "classnames/bind";
const cx = classNames.bind(require("./appFooter.module.css"));
const AppFooter = props => {
  const { news } = props;
  return (
    <div className={cx("footer-container")}>
      <footer>
        Updated Live with data from{" "}
        <a
          href="https://www.mohfw.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ministry of Health and Family Welfare
        </a>
        
      </footer>
    </div>
  );
};
export default AppFooter;
