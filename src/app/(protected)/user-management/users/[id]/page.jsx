import React from "react";
import { Tag, Descriptions, Typography, Space } from "antd";
import { useParams, useNavigate } from "react-router";
import { Page, Section } from "admiral";
import { detailUser } from "../../_data";

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = String(id || "");
  const user = detailUser(userId)?.data || {};

  const renderStatusTag = (status) => {
    const color = status === "Active" ? "#52c41a" : "#ff4d4f";
    const backgroundColor = status === "Active" ? "#f6ffed" : "#fff2f0";
    return <Tag style={{ color, backgroundColor, border: 'none' }}>{status}</Tag>;
  };

  const renderRoleTag = (role) => {
    let color;
    let backgroundColor;
    switch (role) {
      case "Administrator":
        color = "#cf1322";
        backgroundColor = "#fff2f0";
        break;
      case "PMO Admin":
      case "PMO Mind ID":
        color = "#d46b08";
        backgroundColor = "#fff7e6";
        break;
      case "Direktur Mind ID":
        color = "#d4380d";
        backgroundColor = "#fff2e8";
        break;
      case "Tim Proyek":
        color = "#1677ff";
        backgroundColor = "#f0f5ff";
        break;
      default:
        color = "#8c8c8c";
        backgroundColor = "#fafafa";
    }
    return <Tag style={{ color, backgroundColor, border: 'none' }}>{role}</Tag>;
  };

  const breadcrumbs = [
    {
      label: "User Management",
      path: "/user-management/users",
    },
    {
      label: "Daftar User",
      path: "/user-management/users",
    },
    {
      label: user.nama_user || "",
      path: "#",
    },
  ];

  const items = [
    {
      key: "nip",
      label: "NIP",
      children: <Typography.Text strong>{user.nip || "-"}</Typography.Text>,
    },
    {
      key: "nik",
      label: "NIK",
      children: <Typography.Text strong>{user.nik || "-"}</Typography.Text>,
    },
    {
      key: "nama_user",
      label: "Nama User",
      children: <Typography.Text strong>{user.nama_user || "-"}</Typography.Text>,
    },
    {
      key: "email",
      label: "Email",
      children: <Typography.Text strong>{user.email || "-"}</Typography.Text>,
    },
    {
      key: "role",
      label: "Role",
      children: user.role ? renderRoleTag(user.role) : "-",
    },
    {
      key: "username",
      label: "Username",
      children: <Typography.Text strong>{user.username || "-"}</Typography.Text>,
    },
    {
      key: "perusahaan",
      label: "Perusahaan",
      children: <Typography.Text strong>{user.perusahaan || "-"}</Typography.Text>,
    },
    {
      key: "status",
      label: "Status",
      children: user.status ? renderStatusTag(user.status) : "-",
    },
    {
      key: "created_at",
      label: "Created At",
      children: <Typography.Text strong>{user.created_at || "-"}</Typography.Text>,
    },
    {
      key: "updated_at",
      label: "Updated At",
      children: <Typography.Text strong>{user.updated_at || "-"}</Typography.Text>,
    },
  ];

  return (
    <Page
      title={`Detail User: ${user.nama_user || ""}`}
      breadcrumbs={breadcrumbs}
      goBack={() => navigate("/user-management/users")}
      noStyle
    >
      <Section>
        <Space style={{ width: "100%" }} direction="vertical" size="middle">
          <Section title="User Information">
            <Descriptions
              bordered
              layout="horizontal"
              items={items}
              column={{
                md: 1,
                lg: 2,
                xl: 2,
                xxl: 2,
              }}
            />
          </Section>
        </Space>
      </Section>
    </Page>
  );
};

export default UserDetailPage;
