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
import { allKurs } from "./_data";

export const Component = () => {
  const { handleChange, filters } = useFilter();

  const allKursData = useGetData(allKurs);

  const allKursColumns = [
    {
      dataIndex: "nilai_kurs",
      key: "nilai_kurs",
      title: "Nilai Kurs",
      sorter: true,
      render: (_, record) => (
        <Link to={record.id}>
          <u>USD 1 = IDR {record.nilai_kurs}</u>
        </Link>
      ),
    },
    {
      dataIndex: "tanggal",
      title: "Tanggal",
      key: "tanggal",
      sorter: true,
      render: (_, record) => {
        return formatDate(record.tanggal);
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
              to={urlParser("/master-data/kurs/:id/update", {
                id: record.id,
              })}
            >
              <Button type="link" icon={<EditOutlined />} />
            </Link>
            <Button
              type="link"
              icon={<DeleteOutlined style={{ color: "red" }} />}
              onClick={() => {
                message.success("Kurs successfully deleted");
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
      label: "Kurs",
      path: "/master-data/kurs",
    },
  ];

  return (
    <Page
      title="Kurs"
      breadcrumbs={breadcrumbs}
      topActions={
        <Link to={"/master-data/kurs/create"}>
          <Button type="primary" icon={<PlusCircleOutlined />}>Tambah Kurs</Button>
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
            label: "Tanggal",
            name: "tanggal",
            type: "DateRangePicker",
            width: 230,
            defaultValue:
              typeof filters.tanggal?.[0] === "number"
                ? [dayjs(dayjs.unix(filters.tanggal[0])), dayjs(dayjs.unix(filters.tanggal[1]))]
                : [undefined, undefined],
            placeholder: ["Start", "End"],
          },
        ]}
        onChange={handleChange}
        rowKey="id"
        loading={allKursData.loading}
        source={makeSource(allKursData.data)}
        columns={allKursColumns}
        search={filters.search}
        showRowSelection={true}
        batchActionMenus={[
          {
            key: "delete",
            label: "Delete",
            onClick: (_values, cb) => {
              message.success("Selected kurs successfully deleted");
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
