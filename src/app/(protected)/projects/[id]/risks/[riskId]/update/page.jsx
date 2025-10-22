import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Page } from "admiral";
import { Modal, message, Form } from "antd";

import { RiskForm } from "@/app/(protected)/projects/_components/risk-form.jsx";
import { getRiskById, projectRisks } from "@/app/(protected)/projects/_data/risks.js";

export const Component = () => {
  const { id, riskId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [riskData, setRiskData] = useState(null);

  useEffect(() => {
    const fetchRiskData = async () => {
      setLoading(true);
      try {
        const response = await getRiskById(riskId);
        if (response.data) {
          setRiskData(response.data);
        } else {
          message.error("Risk not found");
          navigate(`/projects/${id}`);
        }
      } catch (error) {
        message.error("Failed to fetch risk data");
        navigate(`/projects/${id}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRiskData();
  }, [riskId, id, navigate]);

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
      label: "Risks",
      path: `/projects/${id}/risks`,
    },
    {
      label: `Edit Risk ${riskData?.nomor_resiko || riskId}`,
      path: `/projects/${id}/risks/${riskId}/update`,
    },
  ];

  const handleFinish = (values) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      try {
        // Find the risk index in the array
        const riskIndex = projectRisks.data.items.findIndex(item => item.id === riskId);
        
        if (riskIndex !== -1) {
          // Update the risk data
          projectRisks.data.items[riskIndex] = {
            ...projectRisks.data.items[riskIndex],
            ...values,
            updated_at: new Date().toISOString(),
          };
          
          message.success("Risk updated successfully");
          navigate(`/projects/${id}`);
        } else {
          message.error("Risk not found");
        }
      } catch (error) {
        message.error("Failed to update risk");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <Page
      title={`Edit Risk - ${riskData?.nomor_resiko || 'Loading...'}`}
      breadcrumbs={breadcrumbs}
      loading={loading}
    >
      <Modal
        title={`Edit Risk - ${riskData?.nomor_resiko || 'Loading...'}`}
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
        <RiskForm
          formProps={{
            form,
            onFinish: handleFinish,
          }}
          initialData={riskData}
          loading={loading}
          isEdit={true}
          onSubmit={handleFinish}
        />
      </Modal>
    </Page>
  );
};

export default Component;
