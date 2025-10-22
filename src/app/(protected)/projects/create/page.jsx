import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router";
import { Page } from "admiral";
import dayjs from "dayjs";

import { FormProject } from "../_components/form.jsx";
import { allProjects } from "../_data/index.js";

export const Component = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (values) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Format the data
      const newProject = {
        id: Date.now().toString(),
        ...values,
        last_sync_date: values.last_sync_date ? values.last_sync_date.toISOString() : null,
        created_at: dayjs().toISOString(),
        updated_at: dayjs().toISOString(),
        dokumen_pendukung: values.dokumen_pendukung || [],
      };

      // Simulate successful creation
      console.log("Project created:", newProject);
      message.success("Project created successfully");

      // Navigate back to projects list
      navigate("/projects");
    } catch (err) {
      setError(err);
      message.error("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbs = [
    {
      label: "Projects",
      path: "/projects",
    },
    {
      label: "Create Project",
      path: "/projects/create",
    },
  ];

  const formProps = {
    onFinish: handleSubmit,
    initialValues: {
      currency: "IDR",
      status: "Active",
      sync_status: "Not Synced",
      capex_estimate: 0,
      opex_estimate_yearly: 0,
      irr_estimate: 0,
      npv_estimate: 0,
      discount_rate: 0,
      dokumen_pendukung: [],
    },
  };

  return (
    <Page
      title="Create Project"
      breadcrumbs={breadcrumbs}
      loading={loading}
    >
      <FormProject
        formProps={formProps}
        error={error}
        loading={loading}
        isEdit={false}
      />
    </Page>
  );
};

export default Component;
