import { useState } from "react";
import { Tag } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Link } from "react-router";
import { Page, DataTable } from "admiral";

import { makeSource } from "@/utils/data-table";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { useGetData } from "@/app/_hooks/use-get-data";
import { allProjects } from "./_data";

export const Component = () => {
  const { handleChange, filters } = useFilter();

  const allProjectsData = useGetData(allProjects);

  // Status tag colors
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "green";
      case "Pending":
        return "orange";
      case "Completed":
        return "blue";
      case "Cancelled":
        return "red";
      default:
        return "default";
    }
  };

  // Simple Project List Columns
  const projectColumns = [
    {
      dataIndex: "project_code",
      key: "project_code",
      title: "Project Code",
      sorter: true,
      render: (_, record) => (
        <Link to={`/projects/${record.id}`}>
          <u>{record.project_code}</u>
        </Link>
      ),
    },
    {
      dataIndex: "business_initiative_name",
      title: "Business Initiative Name",
      key: "business_initiative_name",
      sorter: true,
      width: 300,
      ellipsis: true,
    },
    {
      dataIndex: "company",
      title: "Company",
      key: "company",
      sorter: true,
    },
    {
      dataIndex: "amendment_number",
      title: "Amendment No",
      key: "amendment_number",
      sorter: true,
    },
    {
      dataIndex: "baseline",
      title: "Baseline",
      key: "baseline",
      sorter: true,
    },
    {
      dataIndex: "status",
      title: "Status",
      key: "status",
      sorter: true,
      render: (status) => (
        <Tag color={getStatusColor(status)} bordered={false}>
          {status}
        </Tag>
      ),
    },
    {
      dataIndex: "created_at",
      title: "Created Date",
      key: "created_at",
      sorter: true,
      render: (date) => date ? dayjs(date).format("DD/MM/YYYY") : "-",
    },
  ];

  const breadcrumbs = [
    {
      label: "Projects",
      path: "/projects",
    },
  ];

  return (
    <Page
      title="Projects"
      breadcrumbs={breadcrumbs}
      noStyle
    >
      <DataTable
        onChange={handleChange}
        rowKey="id"
        loading={allProjectsData.loading}
        source={makeSource(allProjectsData.data)}
        columns={projectColumns}
        showRowSelection={false}
        filters={[
          {
            label: "filter",
            name: "filter",
            type: "Group",
            icon: <FilterOutlined />,
            cols: 2,
            filters: [
              {
                label: "Company",
                name: "company",
                type: "Select",
                placeholder: "Select company",
                defaultValue: filters.company,
                options: [
                  { label: "PT Aneka Tambang Tbk", value: "PT Aneka Tambang Tbk" },
                  { label: "PT Other Company", value: "PT Other Company" },
                ],
              },
              {
                label: "Status",
                name: "status",
                type: "Select",
                placeholder: "Select status",
                defaultValue: filters.status,
                options: [
                  { label: "Active", value: "Active" },
                  { label: "Pending", value: "Pending" },
                  { label: "Completed", value: "Completed" },
                  { label: "Cancelled", value: "Cancelled" },
                ],
              },
              {
                label: "Division",
                name: "division",
                type: "Select",
                placeholder: "Select division",
                defaultValue: filters.division,
                options: [
                  { label: "Engineering", value: "Engineering" },
                  { label: "IT", value: "IT" },
                  { label: "Environmental", value: "Environmental" },
                  { label: "HR", value: "HR" },
                ],
              },
              {
                label: "Created Date",
                name: "created_date",
                type: "DateRangePicker",
                defaultValue: filters.created_date,
              },
            ],
          },
        ]}
      />
    </Page>
  );
};

export default Component;
