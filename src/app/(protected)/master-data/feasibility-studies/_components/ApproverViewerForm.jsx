import { Button, Col, Form, Row, Select } from "antd";
import { Section } from "admiral";
import { Flex } from "antd";
import { useNavigate } from "react-router";

import { useFormErrorHandling } from "@/app/_hooks/form/use-form-error-handling";

export const ApproverViewerForm = ({ formProps, error, loading, isEdit, feasibilityStudyId }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useFormErrorHandling(error, ({ key, message }) =>
    form.setFields([{ name: key, errors: [message] }]),
  );

  // Dummy data for companies (MindID Group)
  const companyOptions = [
    { label: "PT Aneka Tambang Tbk", value: "PT Aneka Tambang Tbk" },
    { label: "PT Bukit Asam Tbk", value: "PT Bukit Asam Tbk" },
    { label: "PT Freeport Indonesia", value: "PT Freeport Indonesia" },
    { label: "PT Indonesia Asahan Aluminium (Inalum)", value: "PT Indonesia Asahan Aluminium (Inalum)" },
    { label: "PT Timah Tbk", value: "PT Timah Tbk" },
    { label: "PT Vale Indonesia", value: "PT Vale Indonesia" },
  ];

  // Dummy data for PMO AH users
  const pmoAhUsers = [
    { label: "Ahmad Rizky (PMO AH)", value: "ahmad_rizky_pmo_ah" },
    { label: "Siti Nurhaliza (PMO AH)", value: "siti_nurhaliza_pmo_ah" },
    { label: "Budi Santoso (PMO AH)", value: "budi_santoso_pmo_ah" },
    { label: "Dewi Sartika (PMO AH)", value: "dewi_sartika_pmo_ah" },
    { label: "Eko Prasetyo (PMO AH)", value: "eko_prasetyo_pmo_ah" },
  ];

  // Dummy data for PMO Mind ID users
  const pmoMindIdUsers = [
    { label: "Agus Setiawan (PMO Mind ID)", value: "agus_setiawan_pmo_mind" },
    { label: "Rina Kartika (PMO Mind ID)", value: "rina_kartika_pmo_mind" },
    { label: "Dani Kurniawan (PMO Mind ID)", value: "dani_kurniawan_pmo_mind" },
    { label: "Lina Marlina (PMO Mind ID)", value: "lina_marlina_pmo_mind" },
    { label: "Hendra Wijaya (PMO Mind ID)", value: "hendra_wijaya_pmo_mind" },
  ];

  // Dummy data for viewers
  const viewerUsers = [
    { label: "Fajar Nugroho", value: "fajar_nugroho" },
    { label: "Maya Sari", value: "maya_sari" },
    { label: "Riko Pratama", value: "riko_pratama" },
    { label: "Nina Anggraini", value: "nina_anggraini" },
    { label: "Yoga Permana", value: "yoga_permana" },
    { label: "Tika Rahayu", value: "tika_rahayu" },
    { label: "Indra Gunawan", value: "indra_gunawan" },
    { label: "Sari Wulandari", value: "sari_wulandari" },
  ];

  const handleCancel = () => {
    if (feasibilityStudyId) {
      navigate(`/master-data/feasibility-studies/${feasibilityStudyId}`);
    } else {
      navigate("/master-data/feasibility-studies");
    }
  };

  return (
    <Form {...formProps} form={form} layout="vertical">
      <Section>
        <Section title="Approver & Viewer Information">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Perusahaan"
                name="perusahaan"
                rules={[
                  {
                    required: true,
                    message: "Perusahaan is required",
                  },
                ]}
              >
                <Select 
                  placeholder="Pilih Perusahaan"
                  options={companyOptions}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            
            <Col span={24}>
              <Form.Item
                label="Approver PMO AH"
                name="approver_pmo_ah"
                rules={[
                  {
                    required: true,
                    message: "At least one Approver PMO AH is required",
                  },
                ]}
              >
                <Select 
                  mode="multiple"
                  placeholder="Pilih Approver PMO AH (bisa pilih lebih dari satu)"
                  options={pmoAhUsers}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Approver PMO Mind ID"
                name="approver_pmo_mind_id"
                rules={[
                  {
                    required: true,
                    message: "At least one Approver PMO Mind ID is required",
                  },
                ]}
              >
                <Select 
                  mode="multiple"
                  placeholder="Pilih Approver PMO Mind ID (bisa pilih lebih dari satu)"
                  options={pmoMindIdUsers}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Viewer"
                name="viewer"
                rules={[
                  {
                    required: true,
                    message: "At least one Viewer is required",
                  },
                ]}
              >
                <Select 
                  mode="multiple"
                  placeholder="Pilih Viewer (bisa pilih lebih dari satu)"
                  options={viewerUsers}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </Section>
      </Section>

      <Flex justify="flex-end" gap={16} style={{ marginTop: 24 }}>
        <Button type="text" disabled={loading} onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {isEdit ? "Update Approver & Viewer" : "Add Approver & Viewer"}
        </Button>
      </Flex>
    </Form>
  );
};
