import { Row } from "antd";
import React from "react";
import "./common/styles.css";

const HeaderComponent = () => {
  return (
    <React.Fragment>
      <Row justify="end" gutter={50} style={{ paddingTop: 20 }}></Row>
    </React.Fragment>
  );
};

export default HeaderComponent;
