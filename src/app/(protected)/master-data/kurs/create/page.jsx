import { message } from "antd";
import { Page } from "admiral";
import { useNavigate } from "react-router";

import { FormKurs } from "@protected/master-data/kurs/_components/Form";

export const Component = () => {
  const navigate = useNavigate();
  const breadcrumb = [
    {
      label: "Master Data",
      path: "/master-data",
    },
    {
      label: "Kurs",
      path: "/master-data/kurs",
    },
    {
      label: "Create Kurs",
      path: "#",
    },
  ];

  const handleOnFinish = (values) => {
    // Automatically set status to Active when creating
    const dataWithStatus = {
      ...values,
      status: "Active",
    };
    message.success("Kurs successfully created");
    navigate("/master-data/kurs");
  };

  return (
    <Page
      title="Add Kurs"
      breadcrumbs={breadcrumb}
      noStyle
      goBack={() => navigate("/master-data/kurs")}
    >
      <FormKurs formProps={{ onFinish: handleOnFinish }} error={null} loading={false} />
    </Page>
  );
};

export default Component;
