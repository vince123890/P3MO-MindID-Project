import { message } from "antd";
import { Page } from "admiral";
import { useNavigate } from "react-router";

import { FormBook } from "@protected/examples/books/_components/form";

export const Component = () => {
  const navigate = useNavigate();
  const breadcrumb = [
    {
      label: "Books",
      path: "/examples/books",
    },
    {
      label: "Create Book",
      path: "#",
    },
  ];

  const handleOnFinish = () => {
    message.success("Book successfully created");
    navigate("/examples/books");
  };

  return (
    <Page
      title="Add Book"
      breadcrumbs={breadcrumb}
      noStyle
      goBack={() => navigate("/examples/books")}
    >
      <FormBook formProps={{ onFinish: handleOnFinish }} error={null} loading={false} />
    </Page>
  );
};

export default Component;
