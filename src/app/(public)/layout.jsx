import { LoginOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ConfigProvider } from "antd";
import { Typography } from "antd";
import { Layout, Menu } from "antd";
import { Link, Outlet, useNavigate } from "react-router";

const { Header, Content, Footer } = Layout;

const PageExample = () => {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100dvh" }}>
      <Header style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <div>
          <Typography.Title level={5} strong>
            Web Prototyping
          </Typography.Title>
        </div>
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemColor: "#08979C",
                itemHoverColor: "#006D75",
              },
            },
          }}
        >
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={[
              {
                label: <Link to="/">Home</Link>,
                key: "1",
              },
              {
                label: <Link to="/example-landing">Example</Link>,
                key: "2",
              },
            ]}
            style={{ flex: 1, minWidth: 0 }}
          />
        </ConfigProvider>
        <Button icon={<LoginOutlined />} onClick={() => navigate("/auth/login")}>
          Login
        </Button>
      </Header>

      <Content style={{ marginTop: "24px", padding: "0 48px" }}>
        <div
          style={{
            backgroundColor: "#fff",
            padding: "24px",
            borderRadius: "8px",
          }}
        >
          <Outlet />
        </div>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        Dot Prototype ©{new Date().getFullYear()} Created by Dot team
      </Footer>
    </Layout>
  );
};

export default PageExample;
