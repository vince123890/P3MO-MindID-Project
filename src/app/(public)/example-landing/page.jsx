import { Button, Flex, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { Page, DataTable } from "admiral";

import { makeSource } from "@/utils/data-table";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { urlParser } from "@/utils/url-parser";
import { useGetData } from "@/app/_hooks/use-get-data";
import { allProductLending } from "./_data";

export const Component = () => {
  const { handleChange, filters } = useFilter();

  const productLendingData = useGetData(allProductLending);

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "green";
      case "Limited":
        return "orange";
      case "Out of Stock":
        return "red";
      default:
        return "default";
    }
  };

  const productLendingColumns = [
    {
      dataIndex: "code",
      key: "code",
      title: "Code",
      sorter: true,
      render: (_, record) => (
        <Link to={record.id}>
          <u>{record.code}</u>
        </Link>
      ),
    },
    {
      dataIndex: "name",
      title: "Name",
      key: "name",
      sorter: true,
    },
    {
      dataIndex: "qty",
      title: "Qty",
      key: "qty",
      sorter: true,
    },
    {
      dataIndex: "status",
      title: "Status",
      key: "status",
      sorter: true,
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
    {
      dataIndex: "category",
      title: "Category",
      key: "category",
      sorter: true,
    },
    {
      dataIndex: "totalItems",
      title: "Total Items",
      key: "totalItems",
      sorter: true,
    },
    {
      dataIndex: "Action",
      title: "Action",
      key: "Action",
      render: (_, record) => {
        return (
          <Flex>
            <Link
              to={urlParser("/example-landing/:id", {
                id: record.id,
              })}
            >
              <Button type="link" icon={<EyeOutlined style={{ color: "green" }} />} />
            </Link>
          </Flex>
        );
      },
    },
  ];

  // Get unique categories for filter
  const categoryOptions = [
    ...new Set(productLendingData.data?.data?.items?.map((item) => item.category) || []),
  ].map((category) => ({ label: category, value: category }));

  // Get unique statuses for filter
  const statusOptions = [
    ...new Set(productLendingData.data?.data?.items?.map((item) => item.status) || []),
  ].map((status) => ({ label: status, value: status }));

  return (
    <Page title="Product Lending" noStyle>
      <DataTable
        filterComponents={[
          {
            label: "Status",
            name: "status",
            type: "CheckboxDropdown",
            placeholder: "Select Status",
            width: 140,
            defaultValue: filters.status,
            options: statusOptions,
          },
          {
            label: "Category",
            name: "category",
            type: "CheckboxDropdown",
            placeholder: "Select Category",
            width: 140,
            defaultValue: filters.category,
            options: categoryOptions,
          },
        ]}
        onChange={handleChange}
        rowKey="id"
        loading={productLendingData.loading}
        source={makeSource(productLendingData.data)}
        columns={productLendingColumns}
        search={filters.search}
      />
    </Page>
  );
};

export default Component;
