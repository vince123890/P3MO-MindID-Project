import { Section } from "admiral";
import { Typography, Empty } from "antd";

const { Title, Text } = Typography;

const ProjectChangeStatusContent = () => {
  return (
    <Section title="Change Status" loading={false}>
      <Empty
        description={
          <div>
            <Title level={4} type="secondary">
              Change Status Content
            </Title>
            <Text type="secondary">
              Content will be added soon
            </Text>
          </div>
        }
      />
    </Section>
  );
};

export default ProjectChangeStatusContent;
