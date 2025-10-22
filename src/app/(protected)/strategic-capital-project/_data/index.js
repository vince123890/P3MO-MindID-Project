export const dashboardData = {
  status_code: 200,
  data: {
    summary: {
      total_projects: 22,
      spi: 1.1,
      cpi: 0.8,
      high_risk: 18,
      showing: 22,
      total: 22,
    },
    total_investment: {
      upstream: 35,
      midstream: 40,
      downstream: 25,
    },
    company_distribution: [
      { name: "PTFI", value: 25, color: "#3B82F6" },
      { name: "PTBA", value: 20, color: "#10B981" },
      { name: "Inalum", value: 22, color: "#06B6D4" },
      { name: "Antam", value: 15, color: "#8B5CF6" },
      { name: "Vale", value: 10, color: "#6366F1" },
      { name: "Timah", value: 8, color: "#A855F7" },
    ],
    project_objectives: [
      { name: "A", value: 15, label: "New First Pass Substitute" },
      { name: "B", value: 8, label: "New Missing Facilities" },
      { name: "C", value: 10, label: "Major Modifications" },
      { name: "D", value: 7, label: "Minor Plant Relocation" },
      { name: "E", value: 4, label: "Life Support Relocation" },
    ],
    project_phase: [
      { phase: "FEL 2", quantity: 1 },
      { phase: "FEL 3", quantity: 4 },
      { phase: "Detail Engineering", quantity: 3 },
      { phase: "Construction", quantity: 2 },
      { phase: "Commissioning", quantity: 1 },
      { phase: "Operate Optimize", quantity: 4 },
    ],
    commodity_distribution: [
      { commodity: "Nickel", value: 10 },
      { commodity: "Alumunium", value: 4 },
      { commodity: "Gold", value: 3 },
      { commodity: "Tin", value: 3 },
      { commodity: "Copper", value: 5 },
    ],
    project_type: [
      { type: "New First Pass Substitute", quantity: 3 },
      { type: "New Missing Facilities", quantity: 4 },
      { type: "Major Modifications", quantity: 2 },
      { type: "Minor Plant Relocation", quantity: 4 },
      { type: "Life Support Relocation", quantity: 2 },
    ],
  },
  version: "1.0.0",
};

export const getStrategicCapitalProjectData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dashboardData);
    }, 500);
  });
};
