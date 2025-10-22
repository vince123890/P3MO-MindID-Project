import React from "react";
import {
  Tag,
} from "antd";
import { Link } from "react-router";
import { SearchOutlined } from "@ant-design/icons";
import { Page, DataTable } from "admiral";
import { listUsers } from "../_data";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { makeSource } from "@/utils/data-table";
import { useGetData } from "@/app/_hooks/use-get-data";

const UsersPage = () => {
  const { handleChange, filters } = useFilter();
  const usersData = useGetData(listUsers);

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

  const filterComponents = [
    {
      label: "Status",
      name: "status",
      type: "Select",
      placeholder: "Select status",
      defaultValue: filters.status,
      options: [
        {
          label: "Active",
          value: "Active",
        },
        {
          label: "Inactive",
          value: "Inactive",
        },
      ],
    },
  ];

  const columns = [
    {
      title: "Nama User",
      dataIndex: "nama_user",
      key: "nama_user",
      sorter: true,
      render: (text, record) => (
        <Link to={`/user-management/users/${record.id}`} style={{ color: '#1677ff' }}>
          {text}
        </Link>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => renderRoleTag(text),
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Perusahaan",
      dataIndex: "perusahaan",
      key: "perusahaan",
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => renderStatusTag(text),
      sorter: true,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      sorter: true,
    },
  ];

  const breadcrumbs = [
    {
      label: "User Management",
      path: "/user-management/users",
    },
    {
      label: "Daftar User",
      path: "/user-management/users",
    },
  ];

  return (
    <Page
      title="Daftar User"
      breadcrumbs={breadcrumbs}
      noStyle
    >
      <DataTable
        search={filters.search}
        searchPlaceholder="Search..."
        searchIcon={<SearchOutlined />}
        rowKey="id"
        columns={columns}
        source={makeSource(usersData.data)}
        onChange={handleChange}
        loading={usersData.loading}
        filterComponents={filterComponents}
        showRowSelection={false}
      />
    </Page>
  );
};

export default UsersPage;
