import { message } from "antd";
import { Page } from "admiral";
import { useNavigate } from "react-router";

import { FormMovie } from "@protected/examples/movies/_components/form";

export const Component = () => {
  const navigate = useNavigate();
  const breadcrumb = [
    {
      label: "Movies",
      path: "/movies",
    },
    {
      label: "Create Movie",
      path: "#",
    },
  ];

  const handleOnFinish = () => {
    message.success("Movie successfully created");
    navigate("/examples/movies");
  };

  return (
    <Page
      title="Add Movie"
      breadcrumbs={breadcrumb}
      noStyle
      goBack={() => navigate("/examples/movies")}
    >
      <FormMovie formProps={{ onFinish: handleOnFinish }} error={null} loading={false} />
    </Page>
  );
};

export default Component;
