import { Col, Row, Tag } from "antd";
import React from "react";

const MonitorHistory = (params) => {
  const url = process.env.REACT_APP_ALLEGRO_URL;
  let imgUrl = null;
  if (params.params.images[0] !== undefined) {
    imgUrl = params.params.images[0].url;
  }

  return (
    <React.Fragment>
      <Row justify="center" align="middle">
        <Col
          span={4}
          style={{
            padding: "10px",
            height: "120px",
            width: "120px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {imgUrl ? (
            <a href={url + "/oferta/" + params.params.id}>
              <img alt="zdjecie" width="100px" height="100px" src={imgUrl} />
            </a>
          ) : (
            "Brak zdjęcia"
          )}
        </Col>
        <Col span={2}>
          <Tag color={"green"} key="tag">
            {params.other.website === "allegro" ? "Allegro" : "EBay"}
          </Tag>
        </Col>
        <Col span={12}>
          <a href={url + "/oferta/" + params.params.id}>{params.params.name}</a>
        </Col>
        <Col span={6}>
          {params.params.sellingMode.price.amount}{" "}
          {params.params.sellingMode.price.currency}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default MonitorHistory;
