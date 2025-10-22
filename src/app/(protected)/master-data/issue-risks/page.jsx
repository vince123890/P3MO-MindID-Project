import { Button, Flex, message, Tag } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { Page, DataTable } from "admiral";
import dayjs from "dayjs";

import { makeSource } from "@/utils/data-table";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { urlParser } from "@/utils/url-parser";
import { useGetData } from "@/app/_hooks/use-get-data";
import { formatDate } from "@/utils/date-format";
import { allIssueRisks } from "./_data";

export const Component = () => {
  const { handleChange, filters } = useFilter();

  const allIssueRisksData = useGetData(allIssueRisks);

  const allIssueRisksColumns = [
    {
      dataIndex: "kode_issue_risk",
      key: "kode_issue_risk",
      title: "Kode Issue/Resiko",
      sorter: true,
      render: (_, record) => (
        <Link to={record.id}>
          <u>{record.kode_issue_risk}</u>
        </Link>
      ),
    },
    {
      dataIndex: "tipe_issue_risk",
      title: "Tipe Resiko/Issue",
      key: "tipe_issue_risk",
      sorter: true,
    },
    {
      dataIndex: "status",
      title: "Status",
      key: "status",
      sorter: true,
      render: (_, record) => {
        const color = record.status === "Active" ? "green" : "red";
        return <Tag color={color} style={{ border: 'none' }}>{record.status}</Tag>;
      },
    },
    {
      dataIndex: "created_at",
      title: "Created At",
      key: "created_at",
      sorter: true,
      render: (_, record) => {
        return formatDate(record.created_at);
      },
    },
    {
      dataIndex: "Action",
      title: "Action",
      key: "Action",
      render: (_, record) => {
        return (
          <Flex>
            <Link
              to={urlParser("/master-data/issue-risks/:id/update", {
                id: record.id,
              })}
            >
              <Button type="link" icon={<EditOutlined />} />
            </Link>
            <Button
              type="link"
              icon={<DeleteOutlined style={{ color: "red" }} />}
              onClick={() => {
                message.success("Issue/Risk successfully deleted");
              }}
            />
          </Flex>
        );
      },
    },
  ];

  const breadcrumbs = [
    {
      label: "Master Data",
      path: "/master-data",
    },
    {
      label: "Issue/Resiko",
      path: "/master-data/issue-risks",
    },
  ];

  return (
    <Page
      title="Issue/Resiko"
      breadcrumbs={breadcrumbs}
      topActions={
        <Link to={"/master-data/issue-risks/create"}>
          <Button type="primary" icon={<PlusCircleOutlined />}>Tambah Issue/Risk</Button>
        </Link>
      }
      noStyle
    >
      <DataTable
        filterComponents={[
          {
            label: "Status",
            name: "status",
            type: "Select",
            placeholder: "Select Status",
            width: 140,
            defaultValue: filters.status,
            options: [
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" },
            ],
          },
          {
            label: "Tipe",
            name: "tipe_issue_risk",
            type: "Select",
            placeholder: "Select Type",
            width: 180,
            defaultValue: filters.tipe_issue_risk,
            options: [
              { label: "Technical Risk", value: "Technical Risk" },
              { label: "Budget Risk", value: "Budget Risk" },
              { label: "Schedule Risk", value: "Schedule Risk" },
              { label: "Resource Risk", value: "Resource Risk" },
              { label: "Quality Issue", value: "Quality Issue" },
              { label: "Scope Issue", value: "Scope Issue" },
              { label: "Communication Risk", value: "Communication Risk" },
              { label: "Stakeholder Risk", value: "Stakeholder Risk" },
              { label: "External Risk", value: "External Risk" },
              { label: "Compliance Issue", value: "Compliance Issue" },
            ],
          },
        ]}
        onChange={handleChange}
        rowKey="id"
        loading={allIssueRisksData.loading}
        source={makeSource(allIssueRisksData.data)}
        columns={allIssueRisksColumns}
        search={filters.search}
        showRowSelection={true}
        batchActionMenus={[
          {
            key: "delete",
            label: "Delete",
            onClick: (_values, cb) => {
              message.success("Selected issue/risks successfully deleted");
              cb.reset();
            },
            danger: true,
            icon: <DeleteOutlined />,
          },
        ]}
      />
    </Page>
  );
};

export default Component;
