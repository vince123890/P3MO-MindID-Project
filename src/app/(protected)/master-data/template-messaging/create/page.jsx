import { message } from "antd";
import { Page } from "admiral";
import { useNavigate } from "react-router";

import { FormTemplateMessaging } from "@protected/master-data/template-messaging/_components/Form";

export const Component = () => {
  const navigate = useNavigate();
  const breadcrumb = [
    {
      label: "Master Data",
      path: "/master-data",
    },
    {
      label: "Template Messaging",
      path: "/master-data/template-messaging",
    },
    {
      label: "Add Template",
      path: "#",
    },
  ];

  const handleOnFinish = (values) => {
    // Automatically set status to Active when creating
    const dataWithStatus = {
      ...values,
      status: "Active",
    };
    message.success("Template Messaging successfully created");
    navigate("/master-data/template-messaging");
  };

  return (
    <Page
      title="Add Template Messaging"
      breadcrumbs={breadcrumb}
      noStyle
      goBack={() => navigate("/master-data/template-messaging")}
    >
      <FormTemplateMessaging formProps={{ onFinish: handleOnFinish }} error={null} loading={false} />
    </Page>
  );
};

export default Component;
