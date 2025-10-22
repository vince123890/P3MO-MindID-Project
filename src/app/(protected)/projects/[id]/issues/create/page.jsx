import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Page } from "admiral";
import { Modal, message, Form } from "antd";

import { IssueForm } from "@/app/(protected)/projects/_components/issue-form.jsx";
import { projectIssues } from "@/app/(protected)/projects/_data/issues.js";

export const Component = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

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
      label: "Create Issue",
      path: `/projects/${id}/issues/create`,
    },
  ];

  const handleFinish = (values) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      try {
        // Generate new issue ID
        const newId = String(Math.max(...projectIssues.data.items.map(item => parseInt(item.id)), 0) + 1);
        
        // Generate issue number - get the highest number for this project and increment
        const projectIssuesFiltered = projectIssues.data.items
          .filter(item => item.project_id === id)
          .map(item => {
            const match = item.nomor_issue.match(/ISS-(\d+)/);
            return match ? parseInt(match[1]) : 0;
          });
        
        const lastIssueNumber = projectIssuesFiltered.length > 0 ? Math.max(...projectIssuesFiltered) : 0;
        const issueNumber = `ISS-${String(lastIssueNumber + 1).padStart(3, '0')}`;
        
        // Create new issue object
        const newIssue = {
          id: newId,
          project_id: id,
          nomor_issue: issueNumber,
          ...values,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        // Add to issues array (in real app, this would be an API call)
        projectIssues.data.items.push(newIssue);
        
        message.success("Issue created successfully");
        navigate(`/projects/${id}`);
      } catch (error) {
        message.error("Failed to create issue");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <Page
      title="Create Issue"
      breadcrumbs={breadcrumbs}
    >
      <Modal
        title="Create New Issue"
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
          onSubmit={handleFinish}
        />
      </Modal>
    </Page>
  );
};

export default Component;
