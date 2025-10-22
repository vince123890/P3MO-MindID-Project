import { Button, Flex, message, Tag } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { Page, DataTable } from "admiral";

import { makeSource } from "@/utils/data-table";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { urlParser } from "@/utils/url-parser";
import { useGetData } from "@/app/_hooks/use-get-data";
import { formatDate } from "@/utils/date-format";
import { allTemplateMessagings } from "./_data";
import { allPerusahaans } from "../perusahaans/_data";

export const Component = () => {
  const { handleChange, filters } = useFilter();

  const allTemplateMessagingsData = useGetData(allTemplateMessagings);

  // Get unique companies for filter options
  const companyOptions = allPerusahaans.data.items.map((item) => ({
    label: item.nama_perusahaan,
    value: item.nama_perusahaan,
  }));

  const allTemplateMessagingsColumns = [
    {
      dataIndex: "nama_template",
      key: "nama_template",
      title: "Nama Template",
      sorter: true,
      render: (_, record) => (
        <Link to={record.id}>
          <u>{record.nama_template}</u>
        </Link>
      ),
    },
    {
      dataIndex: "perusahaan",
      title: "Perusahaan",
      key: "perusahaan",
      sorter: true,
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
      dataIndex: "Action",
      title: "Action",
      key: "Action",
      render: (_, record) => {
        return (
          <Flex>
            <Link
              to={urlParser("/master-data/template-messaging/:id/update", {
                id: record.id,
              })}
            >
              <Button type="link" icon={<EditOutlined />} />
            </Link>
            <Button
              type="link"
              icon={<DeleteOutlined style={{ color: "red" }} />}
              onClick={() => {
                message.success("Template Messaging successfully deleted");
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
      label: "Template Messaging",
      path: "/master-data/template-messaging",
    },
  ];

  return (
    <Page
      title="Template Messaging"
      breadcrumbs={breadcrumbs}
      topActions={
        <Link to={"/master-data/template-messaging/create"}>
          <Button type="primary" icon={<PlusCircleOutlined />}>Tambah Template</Button>
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
            label: "Perusahaan",
            name: "perusahaan",
            type: "Select",
            placeholder: "Select Company",
            width: 220,
            defaultValue: filters.perusahaan,
            options: companyOptions,
          },
        ]}
        onChange={handleChange}
        rowKey="id"
        loading={allTemplateMessagingsData.loading}
        source={makeSource(allTemplateMessagingsData.data)}
        columns={allTemplateMessagingsColumns}
        search={filters.search}
        showRowSelection={true}
        batchActionMenus={[
          {
            key: "delete",
            label: "Delete",
            onClick: (_values, cb) => {
              message.success("Selected templates successfully deleted");
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
