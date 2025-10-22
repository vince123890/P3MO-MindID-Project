import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Page } from "admiral";
import { Modal, message, Form } from "antd";

import { IssueForm } from "@/app/(protected)/projects/_components/issue-form.jsx";
import { getIssueById, projectIssues } from "@/app/(protected)/projects/_data/issues.js";

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
      label: "Edit Issue",
      path: `/projects/${id}/issues/${issueId}/update`,
    },
  ];

  const handleFinish = (values) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      try {
        // Validate issue exists
        if (!issueData.data) {
          message.error("Issue not found");
          setLoading(false);
          return;
        }

        // Find and update the issue
        const issueIndex = projectIssues.data.items.findIndex(item => item.id === issueId);
        
        if (issueIndex !== -1) {
          // Update the issue with new values
          projectIssues.data.items[issueIndex] = {
            ...projectIssues.data.items[issueIndex],
            ...values,
            updated_at: new Date().toISOString(),
          };
          
          message.success("Issue updated successfully");
          navigate(`/projects/${id}`);
        } else {
          message.error("Issue not found in data");
        }
      } catch (error) {
        console.error("Update error:", error);
        message.error("Failed to update issue: " + (error.message || "Unknown error"));
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

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
      title="Edit Issue"
      breadcrumbs={breadcrumbs}
    >
      <Modal
        title={`Edit Issue - ${issueData.data.nomor_issue}`}
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
            onFinish: handleFinish,
          }}
          loading={loading}
          isEdit={true}
          initialData={issueData.data}
          onSubmit={handleFinish}
        />
      </Modal>
    </Page>
  );
};

export default Component;
