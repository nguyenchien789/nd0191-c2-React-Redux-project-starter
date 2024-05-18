import React from "react";
import { Button, Layout, Menu, theme } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { store } from "../../state/store/store.js";
import { userLogout } from "../../state/action/action.js";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    label: <Link to={"/"}>Home</Link>,
  },
  {
    label: <Link to={"/leaderboard"}>Leaderboard</Link>,
  },
  {
    label: <Link to={"/new"}>New</Link>,
  },
];
const AppLayout = ({ children }) => {
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.isLogged);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const Logout = () => {
    store.dispatch(userLogout());
    navigate("/login");
  };

  return isLogged != null ? (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h2 style={{ color: "white" }}>Employee Polls</h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          Welcome, {isLogged.name}
          <Button
            type="primary"
            style={{ margin: "20px" }}
            onClick={Logout}
            Logout
          >
            Logout
          </Button>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  ) : (
    <>{children}</>
  );
};

export default AppLayout;
