import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Page } from "admiral";
import { Form, Modal } from "antd";

import { IssueForm } from "@/app/(protected)/projects/_components/issue-form.jsx";
import { getIssueById } from "@/app/(protected)/projects/_data/issues.js";

export const Component = () => {
  const { id, issueId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const issueData = getIssueById(issueId);

  const breadcrumbs = [
    {
      label: "Projects",
      path: "/projects",
    },
    {
      label: "Project Detail",
      path: `/projects/${id}`,
    },
    {
      label: "Issues",
      path: `/projects/${id}/issues`,
    },
    {
      label: "View Issue",
      path: `/projects/${id}/issues/${issueId}`,
    },
  ];

  if (!issueData.data) {
    return (
      <Page
        title="Issue Not Found"
        breadcrumbs={breadcrumbs}
      >
        <div>Issue not found</div>
      </Page>
    );
  }

  return (
    <Page
      title="View Issue"
      breadcrumbs={breadcrumbs}
    >
      <Modal
        title={`Issue Details - ${issueData.data.nomor_issue}`}
        open={true}
        onCancel={() => navigate(-1)}
        footer={null}
        width={1200}
        centered
        styles={{
          body: {
            maxHeight: '80vh',
            overflowY: 'auto'
          }
        }}
      >
        <IssueForm
          formProps={{
            form,
          }}
          isView={true}
          initialData={issueData.data}
        />
      </Modal>
    </Page>
  );
};

export default Component;
