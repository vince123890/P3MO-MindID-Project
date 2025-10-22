import { Typography, Card, Space, Tag } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const CriticalTaskContent = ({ project }) => {
  // Timeline data - months for 2024-2026
  const timelineData = [
    { year: "2024", months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] },
    { year: "2025", months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] },
    { year: "2026", months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] }
  ];
  
  // Gantt chart data with hierarchical structure
  const ganttData = [
    {
      id: "1",
      wbs: "1",
      name: "ITEM HALITIM",
      type: "parent",
      baseline: "Wed 12/30/20 - Tue 6/29/21 (130 days)",
      work: "353 hrs / 353 hrs",
      resources: "Anggota holding",
      status: "Completed",
      progress: 100,
      startMonth: 0,
      duration: 12,
      children: [
        {
          id: "1.1",
          wbs: "1.1",
          name: "Inisiasi",
          type: "child",
          baseline: "Wed 12/30/20 - Mon 2/1/21 (24 days)",
          work: "353 hrs / 353 hrs",
          resources: "Anggota holding",
          status: "Completed",
          progress: 100,
          startMonth: 2,
          duration: 4,
          children: [
            {
              id: "1.1.1",
              wbs: "1.1.1",
              name: "Menyusun Feasibility Study",
              type: "grandchild",
              baseline: "Wed 12/30/20 - Fri 1/8/21 (8 days)",
              work: "353 hrs / 353 hrs",
              resources: "Anggota holding",
              status: "Completed",
              progress: 100,
              startMonth: 4,
              duration: 3
            },
            {
              id: "1.1.1.1",
              wbs: "1.1.1.1",
              name: "Melakukan kajian market & competitor",
              type: "greatgrandchild",
              baseline: "Wed 12/30/20 - Tue 1/5/21 (5 days)",
              work: "353 hrs / 353 hrs",
              resources: "Anggota holding",
              status: "Completed",
              progress: 100,
              startMonth: 7,
              duration: 2
            }
          ]
        }
      ]
    }
  ];

  // Render task rows recursively
  const renderTask = (task, level = 0) => {
    const tasks = [task];
    if (task.children) {
      task.children.forEach(child => {
        tasks.push(...renderTask(child, level + 1));
      });
    }
    return tasks.map(t => ({ ...t, level: t === task ? level : t.level }));
  };

  const allTasks = [];
  ganttData.forEach(task => {
    allTasks.push(...renderTask(task));
  });

  const TaskProgressBar = ({ task }) => {
    const left = (task.startMonth / 36) * 100; // 36 months total
    const width = (task.duration / 36) * 100;
    
    return (
      <div
        style={{
          position: "absolute",
          left: `${left}%`,
          width: `${width}%`,
          height: "20px",
          backgroundColor: "#1890ff",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "11px",
          fontWeight: "500",
          zIndex: 2
        }}
      >
        {task.progress}%
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: "white", borderRadius: "8px", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ 
        display: "flex", 
        backgroundColor: "#f5f5f5",
        borderBottom: "1px solid #d9d9d9"
      }}>
        <div style={{ 
          width: "400px", 
          padding: "12px 16px",
          borderRight: "1px solid #d9d9d9",
          fontWeight: "bold",
          fontSize: "14px"
        }}>
          Task Information
        </div>
        <div style={{ 
          flex: 1, 
          padding: "12px 16px",
          fontWeight: "bold",
          fontSize: "14px",
          textAlign: "center"
        }}>
          Timeline (2024-2026)
        </div>
      </div>

      {/* Timeline months header */}
      <div style={{ 
        display: "flex", 
        backgroundColor: "#fafafa",
        borderBottom: "1px solid #d9d9d9"
      }}>
        <div style={{ 
          width: "400px", 
          borderRight: "1px solid #d9d9d9"
        }} />
        <div style={{ flex: 1, display: "flex" }}>
          {timelineData.map((year) => 
            year.months.map((month, index) => (
              <div
                key={`${year.year}-${month}`}
                style={{
                  flex: 1,
                  padding: "8px 2px",
                  textAlign: "center",
                  fontSize: "10px",
                  color: "#666",
                  borderRight: "1px solid #e8e8e8",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <div>{month}</div>
                <div style={{ fontSize: "9px", marginTop: "2px" }}>
                  {year.year.substring(2)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Task rows */}
      <div>
        {allTasks.map((task, index) => (
          <div
            key={task.id}
            style={{
              display: "flex",
              minHeight: "60px",
              borderBottom: "1px solid #f0f0f0",
              backgroundColor: index % 2 === 0 ? "white" : "#fafafa"
            }}
          >
            {/* Task Information */}
            <div style={{ 
              width: "400px",
              padding: "12px 16px",
              borderRight: "1px solid #d9d9d9",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}>
                <div style={{ 
                  width: "20px", 
                  height: "20px", 
                  backgroundColor: "#52c41a",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "8px"
                }}>
                  <CheckCircleOutlined style={{ color: "white", fontSize: "12px" }} />
                </div>
                <span style={{ 
                  backgroundColor: "#52c41a",
                  color: "white",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontSize: "11px",
                  fontWeight: "500",
                  marginRight: "8px"
                }}>
                  {task.wbs}
                </span>
                <Tag color="green" style={{ margin: 0, fontSize: "11px" }}>
                  {task.status}
                </Tag>
              </div>
              
              <div style={{ 
                color: "#1890ff",
                fontWeight: "bold",
                fontSize: "13px",
                marginBottom: "4px",
                marginLeft: task.level * 20
              }}>
                {task.name}
              </div>
              
              <div style={{ fontSize: "11px", color: "#666", lineHeight: 1.4 }}>
                <div><strong>WBS:</strong> {task.wbs} | <strong>Baseline:</strong> {task.baseline}</div>
                <div><strong>Work:</strong> {task.work} | <strong>Resources:</strong> {task.resources}</div>
              </div>
            </div>

            {/* Timeline */}
            <div style={{ 
              flex: 1, 
              position: "relative", 
              padding: "20px 0",
              backgroundColor: "#f9f9f9"
            }}>
              {/* Grid lines */}
              {timelineData.map((year, yearIndex) => 
                year.months.map((month, monthIndex) => (
                  <div
                    key={`${year.year}-${month}-grid`}
                    style={{
                      position: "absolute",
                      left: `${((yearIndex * 12 + monthIndex + 1) / 36) * 100}%`,
                      top: 0,
                      bottom: 0,
                      borderLeft: "1px solid #e8e8e8",
                      pointerEvents: "none"
                    }}
                  />
                ))
              )}
              
              <TaskProgressBar task={task} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CriticalTaskContent;
