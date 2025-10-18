import { useEffect } from "react";
import { Button, Col, Row, Space, Typography, Form, Input, Layout } from "antd";
import { useIsMobileScreen } from "admiral";
import { useNavigate, useSearchParams } from "react-router";

import { usePostLogin } from "./_hooks/use-post-login";
import { useSession } from "../../_components/providers/session";

const { Content } = Layout;

const Component = () => {
  const session = useSession();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isMobile = useIsMobileScreen();

  useEffect(() => {
    if (session.status === "authenticated") {
      navigate(searchParams.get("callbackUrl") || "/dashboard");
    }
  }, [session.status, navigate, searchParams]);

  const { mutate, isPending: loading } = usePostLogin();

  const handleCredentialLogin = async (values) => mutate(values);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content
        style={{
          display: "flex",
        }}
      >
        <Row style={{ width: "100%" }}>
          <Col
            span={isMobile ? 24 : 10}
            style={{
              position: "relative",
            }}
          >
            <Space
              size="large"
              direction="vertical"
              style={{
                position: "absolute",
                width: "366px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Space
                direction="vertical"
                style={{
                  width: "100%",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Typography.Title level={4}>Welcome back!</Typography.Title>
                <Typography.Text style={{ opacity: 0.5 }}>
                  Ant Design is the most influential web design specification in Xihu district
                </Typography.Text>
              </Space>

              <Form layout="vertical" onFinish={handleCredentialLogin} style={{ width: "100%" }}>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: "Please input your username!" }]}
                >
                  <Input type="username" placeholder="Enter your username" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Please input your password!" }]}
                >
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    style={{ width: "100%" }}
                  >
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </Space>
          </Col>

          <Col span={isMobile ? 0 : 14}>
            <img
              src={"/img/ilustration-login.png"}
              alt="ilustration login"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Component;
