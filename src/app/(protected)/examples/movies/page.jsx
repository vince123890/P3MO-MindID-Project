import { useState } from "react";
import { Button, Flex, message, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FilterOutlined,
  PlusCircleOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { Link } from "react-router";
import { ActionTable, Page, Tabs, DataTable } from "admiral";

import { makeSource } from "@/utils/data-table";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { urlParser } from "@/utils/url-parser";
import { useGetData } from "@/app/_hooks/use-get-data";
import { allMovies, trendingMovies } from "./_data";

export const Component = () => {
  const { handleChange, filters } = useFilter();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const allMoviesData = useGetData(allMovies);
  const trendingMoviesData = useGetData(trendingMovies);

  const allMovieColumns = [
    {
      dataIndex: "title",
      key: "title",
      title: "Title",
      sorter: true,
      render: (_, record) => (
        <Link to={record.id}>
          <u>{record.title}</u>
        </Link>
      ),
    },
    {
      dataIndex: "releaseDate",
      title: "Release Date",
      key: "releaseDate",
      sorter: true,
      render: (_, record) => {
        return record.releaseDate ? dayjs(record.releaseDate).format("DD/MM/YYYY") : "-";
      },
    },
    {
      dataIndex: "director",
      title: "Director",
      key: "director",
      sorter: true,
    },
    {
      dataIndex: "totalCopies",
      title: "Total Copies",
      key: "totalCopies",
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
              to={urlParser("/examples/movies/:id", {
                id: record.id,
              })}
            >
              <Button type="link" icon={<EyeOutlined style={{ color: "green" }} />} />
            </Link>
            <Button
              type="link"
              icon={<DeleteOutlined style={{ color: "red" }} />}
              onClick={() => {
                message.success("Movie successfully deleted");
              }}
            />
            <Link
              to={urlParser("/examples/movies/:id/update", {
                id: record.id,
              })}
            >
              <Button type="link" icon={<EditOutlined />} />
            </Link>
          </Flex>
        );
      },
    },
  ];

  const trendingMovieColumns = [
    {
      dataIndex: "title",
      key: "title",
      title: "Title",
      sorter: true,
      render: (_, record) => (
        <Link to={record.id}>
          <u>{record.title}</u>
        </Link>
      ),
    },
    {
      dataIndex: "releaseDate",
      title: "Release Date",
      key: "releaseDate",
      sorter: true,
      render: (_, record) => {
        return record.releaseDate ? dayjs(record.releaseDate).format("DD/MM/YYYY") : "-";
      },
    },
    {
      dataIndex: "director",
      title: "Director",
      key: "director",
      sorter: true,
    },
    {
      dataIndex: "viewsThisMonth",
      title: "Views This Month",
      key: "viewsThisMonth",
      sorter: true,
    },
    {
      dataIndex: "socialMentions",
      title: "Social Mentions",
      key: "socialMentions",
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
              to={urlParser("/examples/movies/:id", {
                id: record.id,
              })}
            >
              <Button type="link" icon={<EyeOutlined style={{ color: "green" }} />} />
            </Link>
            <Button
              type="link"
              icon={<DeleteOutlined style={{ color: "red" }} />}
              onClick={() => {
                message.success("Movie successfully deleted");
              }}
            />
            <Link
              to={urlParser("/examples/movies/:id/update", {
                id: record.id,
              })}
            >
              <Button type="link" icon={<EditOutlined />} />
            </Link>
          </Flex>
        );
      },
    },
  ];

  const breadcrumbs = [
    {
      label: "Movies",
      path: "/movies",
    },
  ];

  return (
    <Page
      title="Movies"
      breadcrumbs={breadcrumbs}
      topActions={
        <Link to={"/examples/movies/create"}>
          <Button icon={<PlusCircleOutlined />}>Add Movie</Button>
        </Link>
      }
      noStyle
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <ActionTable
          filters={[
            {
              label: "filter",
              name: "filter",
              type: "Group",
              icon: <FilterOutlined />,
              cols: 2,
              filters: [
                {
                  label: "Director",
                  name: "director",
                  type: "Select",
                  placeholder: "Select director",
                  defaultValue: filters.director,
                  options: [
                    { label: "Christopher Nolan", value: "Christopher Nolan" },
                    { label: "Quentin Tarantino", value: "Quentin Tarantino" },
                    { label: "Martin Scorsese", value: "Martin Scorsese" },
                    { label: "David Fincher", value: "David Fincher" },
                  ],
                },
                {
                  label: "Release Date",
                  name: "releaseDate",
                  type: "DateRangePicker",
                  defaultValue: filters.releaseDate,
                },
              ],
            },
            {
              label: "Sort",
              title: "Sort",
              name: "sort",
              type: "Group",
              icon: <SortAscendingOutlined />,
              cols: 2,
              filters: [
                {
                  label: "Field",
                  name: "sort_by",
                  type: "Select",
                  placeholder: "Choose field",
                  value: filters?.sort_by,
                  options: [
                    { label: "Director", value: "director" },
                    { label: "Release Date", value: "releaseDate" },
                    { label: "Total Copies", value: "totalCopies" },
                  ],
                },
                {
                  label: <span style={{ color: "white" }}>.</span>,
                  name: "order",
                  type: "Select",
                  placeholder: "Order",
                  value: filters?.order,
                  options: [
                    { label: "Ascending", value: "asc" },
                    { label: "Descending", value: "desc" },
                  ],
                },
              ],
            },
          ]}
          selectedRows={selectedRowKeys}
          batchActionMenus={[
            {
              key: "delete",
              label: "Delete",
              onClick: (_values, cb) => {
                message.success("Selected movies successfully deleted");
                cb.reset();
                setSelectedRowKeys([]);
              },
              danger: true,
              icon: <DeleteOutlined />,
            },
          ]}
        />
        <Tabs
          type="bordered-card"
          items={[
            {
              label: "All Movies",
              key: "all",
              children: (
                <DataTable
                  onChange={handleChange}
                  rowKey="id"
                  loading={allMoviesData.loading}
                  source={makeSource(allMoviesData.data)}
                  columns={allMovieColumns}
                  search={filters.search}
                  hideSearch
                  rowSelection={{
                    selectedRowKeys: selectedRowKeys,
                    onChange: (selectedRows) => setSelectedRowKeys(selectedRows),
                  }}
                />
              ),
            },
            {
              label: "Trending",
              key: "trending",
              children: (
                <DataTable
                  onChange={handleChange}
                  rowKey="id"
                  loading={trendingMoviesData.loading}
                  source={makeSource(trendingMoviesData.data)}
                  columns={trendingMovieColumns}
                  search={trendingMovies.search}
                  hideSearch
                  rowSelection={{
                    selectedRowKeys: selectedRowKeys,
                    onChange: (selectedRows) => setSelectedRowKeys(selectedRows),
                  }}
                />
              ),
            },
          ]}
        />
      </Space>
    </Page>
  );
};

export default Component;
