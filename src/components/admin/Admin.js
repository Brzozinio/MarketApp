import { Col, Row, Table, Spin, Badge, Button, Tag } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useEffect } from "react";
import styled from "styled-components";
import { Content } from "antd/lib/layout/layout";
import "../common/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAdmin, loadUsers } from "../../store/admin";
import ExpandedTableAdmin from "../ExpandedTableAdmin";

const Admin = () => {
  const dispatch = useDispatch();
  const loaded = useSelector((state) => state.admin.loaded);
  const list = useSelector((state) => state.admin.list);
  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);
  useEffect(() => {
    if (!loaded) dispatch(loadUsers());
  }, [dispatch, loaded]);

  const deleteUser = (id) => {
    dispatch(deleteUserAdmin({ userid: id }));
  };
  const columns = [
    {
      title: "Status",
      dataIndex: "userStatus",
      key: "userStatus",
      className: "tableHeader",
    },
    {
      title: "Nazwa",
      dataIndex: "name",
      key: "name",
      className: "tableHeader",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: "tableHeader",
    },
    {
      title: "Typ konta",
      dataIndex: "accountType",
      key: "accountType",
      className: "tableHeader",
    },
    {
      title: "Akcje",
      dataIndex: "operation",
      key: "operation",
      className: "tableHeader",
    },
  ];

  if (!loaded)
    return (
      <React.Fragment>
        <Row
          justify="center"
          align="center"
          style={{ height: "100%", width: "100%" }}
        >
          <Col span={2}>
            <Spin tip={"Loading..."} />
          </Col>
        </Row>
      </React.Fragment>
    );
  else {
    const data = []; // eslint-disable-next-line
    list[0].users.map((value, index) => {
      let userMonitors = [];

      list[0].monitors.forEach((element) => {
        if (value._id === element.userid) userMonitors.push(element);
      });

      var isActive = false;

      list[0].active.forEach((element) => {
        console.log(element.userID, value._id); // eslint-disable-next-line
        if (element.userID == value._id) {
          isActive = true;
        }
      });

      data.push({
        key: value._id,
        userStatus: (
          <span>
            <Badge status={isActive ? "success" : "error"} />
            {isActive ? "Online" : "Offline"}
          </span>
        ),
        name: value.name,
        email: value.email,
        accountType: value.isAdmin ? (
          <Tag color="geekblue" key="Administrator">
            Administrator
          </Tag>
        ) : (
          <Tag color="green" key="Użytkownik">
            Użytkownik
          </Tag>
        ),
        className: "tableData",
        operation: (
          <Button
            type="primary"
            shape="round"
            danger={true}
            onClick={() => deleteUser(value._id)}
          >
            Usuń Konto
          </Button>
        ),
        childrenData: userMonitors,
      });
    });
    return (
      <React.Fragment>
        <Row
          justify="start"
          align="middle"
          style={{ marginLeft: "10%", marginBottom: "2%" }}
        >
          <Col span={24}>
            <Title level={2} style={{ color: "#1d2a64" }}>
              Panel Administratora
            </Title>
          </Col>
        </Row>
        <Row justify="center" align="middle">
          <Col span={23} style={{ height: "100%" }}>
            <AccountCard>
              <Content style={{ overflow: "auto" }}>
                <Table
                  className="tableMain"
                  columns={columns}
                  expandable={{
                    expandedRowRender: (record) => (
                      <ExpandedTableAdmin record={record} />
                    ),
                    rowExpandable: (record) => record.childrenData.length !== 0,
                  }}
                  dataSource={data}
                  scroll={{ y: 500 }}
                />
              </Content>
            </AccountCard>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
};

export default Admin;

const AccountCard = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  border-radius: 25px;
  padding: 10px;
  background-color: #fafafa;
  border: 1px solid #e9eff8;
  box-shadow: 0 0 3px rgba(33, 33, 33, 0.2);
`;
