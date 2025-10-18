import { MailOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Link } from "react-router";

export const SIDEBAR_ITEMS = [
  {
    key: "/",
    label: <Link to={"/dashboard"}>Dashboard</Link>,
    icon: <MailOutlined />,
    permissions: ["All"],
  },
  {
    key: "/list-components",
    label: <Link to={"/list-components"}>UI Components</Link>,
    icon: <AppstoreOutlined />,
    permissions: ["All"],
  },
  {
    key: "/examples",
    label: "Examples",
    icon: <MailOutlined />,
    children: [
      {
        key: "/examples/movies",
        label: <Link to={"/examples/movies"}>Movies</Link>,
        permissions: ["Admin"],
      },
      {
        key: "/examples/book",
        label: <Link to={"/examples/books"}>Book</Link>,
        permissions: ["Admin"],
      },
    ],
  },
];
