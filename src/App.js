import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Admin from "./components/admin/Admin";
import Signup from "./components/Signup";
import NotFound from "./components/NotFound";
import Dashboard from "./components/Dashboard";
import HeaderComponent from "./components/Header";
import ProtectetRoute from "./components/common/protectedRoute";
import ProtectetRouteAdmin from "./components/common/protectedRouteAdmin";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { loadUserDashboard, loginWithToken } from "./store/user";
import "antd/dist/antd.css";
import { Layout, message, notification } from "antd";
import SidebarComponent from "./components/Sidebar";
import Settings from "./components/Settings";
import AddNewFollow from "./components/AddNewFollow";
import Manage from "./components/Manage";
import Account from "./components/Account";
import Recovery from "./components/Recovery";
import { io } from "socket.io-client";
import MonitorsHistory from "./components/MonitorsHistory";

const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { Content, Sider, Header } = Layout;
  const logged = useSelector((state) => state.users.logged, shallowEqual);
  const [socket, setSocket] = useState(null);

  const isMessage = useSelector(
    (state) => state.messages.isMessage,
    shallowEqual
  );

  const messageData = useSelector(
    (state) => state.messages.message,
    shallowEqual
  );
  const messageType = useSelector(
    (state) => state.messages.messageType,
    shallowEqual
  );
  useEffect(() => {
    if (logged)
      setSocket(
        io(process.env.REACT_APP_API_URL, {
          query: `token=${token}`,
        })
      );
    if (!logged && socket) {
      socket.disconnect();
    } // eslint-disable-next-line
  }, [logged]);

  useEffect(() => {
    if (!socket) return;
    socket.on("newMonitorMessage", (msg) => {
      dispatch(loadUserDashboard());
      notification.open({
        message: "Nowy Wynik Monitorowania",
        description: msg,
        duration: 10,
      });
    });
  });

  useEffect(() => {
    if (isMessage) {
      switch (messageType) {
        case "error":
          message.error(messageData, 2);
          break;
        case "success":
          message.success(messageData, 2);
          break;
        case "warning":
          message.warning(messageData, 2);
          break;
        default:
          message.error(messageData, 2);
      }
    }
  }, [isMessage, messageType, messageData]);

  if (token) {
    if (!logged) dispatch(loginWithToken(token));
  }

  return (
    <Layout
      style={{
        minHeight: "100vh",
        maxHeight: "100vh",
        padding: "40px",
        backgroundColor: "#e9eff8",
      }}
    >
      <Layout
        style={{
          boxShadow: "0 0 11px rgba(33,33,33,.2)",
          borderRadius: "25px",
        }}
      >
        {logged ? (
          <Sider
            breakpoint="lg"
            width="17%"
            height="100%"
            collapsedWidth="0"
            style={{
              borderRadius: "25px 0px 0px 25px",
              backgroundColor: "#f7f9fb",
            }}
          >
            <SidebarComponent />
          </Sider>
        ) : null}
        <Layout
          style={{
            borderRadius: "25px",
          }}
        >
          {logged ? (
            <Header
              style={{
                borderTopRightRadius: "25px",
                backgroundColor: "#ffffff",
                minHeight: "100px",
              }}
            >
              <HeaderComponent />
            </Header>
          ) : null}
          <Content
            style={{
              height: logged ? "calc(100% + 30px)" : "calc(100% - 0px)",
              backgroundColor: logged ? "#ffffff" : "#f7f9fb",
              borderRadius: logged ? "0px 0px 25px 0px" : "25px 25px 25px 25px",
              overflow: "auto",
            }}
          >
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/recovery" component={Recovery} />
              <ProtectetRouteAdmin path="/admin" component={Admin} />
              <Redirect from="/dashboard" to="/" />
              <Redirect from="/register" to="/signup" />
              <Route path="/not-found" component={NotFound} />
              <ProtectetRoute path="/" exact component={Dashboard} />
              <ProtectetRoute
                path="/history"
                exact
                component={MonitorsHistory}
              />
              <ProtectetRoute path="/new" exact component={AddNewFollow} />
              <ProtectetRoute path="/manage" exact component={Manage} />
              <ProtectetRoute path="/account" exact component={Account} />
              <ProtectetRoute path="/settings" exact component={Settings} />
              <Redirect to="/not-found" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
