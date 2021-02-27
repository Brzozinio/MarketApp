import { Col, Row } from "antd";
import React from "react";
import _ from "lodash";

const MonitorsHistoryItem = (params) => {
  console.log(params);
  var image;
  if (params.data.images.length !== 0) image = params.data.images[0].url;
  else
    image =
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5NiA5NiI+PHBhdGggZD0iTTEyIDEydjcyaDcyVjEyem02OCA0djQ3LjgyN0w2Mi4wNjkgNDQuMSA1NCA1Mi4xNzJsLTIwLTIwLTE4IDE4VjE2ek0xNiA4MFY1NS44MjhsMTgtMTggMjAgMjAgNy45MzEtNy45MjhMODAgNjkuNzczVjgweiIgZmlsbD0iI2RkZCIvPjxjaXJjbGUgY3g9IjY0IiBjeT0iMzIiIHI9IjQiIGZpbGw9IiNkZGQiLz48L3N2Zz4=";

  var monitor = _.find(params.monitors, { _id: params.monitorID });
  console.log(monitor);
  return (
    <React.Fragment>
      <Row justify="center" align="middle">
        <Col span={4}>
          <a
            href={
              process.env.REACT_APP_ALLEGRO_URL + "/oferta/" + params.data.id
            }
          >
            <img alt="zdjecie" width="80px" height="80px" src={image} />
          </a>
        </Col>
        <Col span={10}>
          <a
            href={
              process.env.REACT_APP_ALLEGRO_URL + "/oferta/" + params.data.id
            }
          >
            {params.data.name}
          </a>
        </Col>
        <Col span={5}>
          {params.data.sellingMode.price.amount}{" "}
          {params.data.sellingMode.price.currency}
        </Col>
        <Col span={5}>{monitor ? monitor.monitorName : "Monitor usunięty"}</Col>
      </Row>
    </React.Fragment>
  );
};

export default MonitorsHistoryItem;
