// Dummy data for project comparison dashboard

const projectComparisonData = {
  status_code: 200,
  data: {
    // Total CAPEX comparison data
    total_capex: {
      title: "Total CAPEX",
      description: "Total Capital Expenditure allocated for each project initiative across different companies",
      unit: "M",
      currency: "$",
      projects: [
        { name: "PT Aneka Tambang Tbk - Nickel Laterite Processing Plant", value: 6.8, color: "#1890ff", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Coal Mine Expansion Phase III", value: 7.8, color: "#52c41a", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Underground Mining Development", value: 6.9, color: "#fa8c16", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Smelter Modernization", value: 5.5, color: "#722ed1", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Tin Smelting Facility Upgrade", value: 6.2, color: "#eb2f96", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Nickel Processing Complex", value: 6.8, color: "#f5222d", company: "PT Vale Indonesia Tbk" },
        { name: "PT Aneka Tambang Tbk - Bauxite Mining Operation", value: 6.9, color: "#fa541c", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Steam Power Plant Development", value: 7.5, color: "#faad14", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Copper Concentrate Plant", value: 8.8, color: "#a0d911", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Aluminum Rod Plant", value: 9.6, color: "#52c41a", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Offshore Mining Expansion", value: 8.9, color: "#13c2c2", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Nickel Matte Production", value: 8.2, color: "#1890ff", company: "PT Vale Indonesia Tbk" },
        { name: "PT Aneka Tambang Tbk - Gold Processing Facility", value: 7.8, color: "#2f54eb", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Coal Gasification Project", value: 8.4, color: "#722ed1", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Tailings Management System", value: 9.6, color: "#eb2f96", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Alumina Refinery", value: 8.8, color: "#f5222d", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Tin Chemicals Production", value: 7.2, color: "#fa541c", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Ferronickel Smelter", value: 6.5, color: "#faad14", company: "PT Vale Indonesia Tbk" },
      ]
    },

    // Duration comparison data
    duration: {
      title: "Duration",
      description: "Project execution timeline from initiation to completion measured in months",
      unit: "Months",
      currency: "",
      projects: [
        { name: "PT Aneka Tambang Tbk - Nickel Laterite Processing Plant", value: 18, color: "#1890ff", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Coal Mine Expansion Phase III", value: 24, color: "#52c41a", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Underground Mining Development", value: 16, color: "#fa8c16", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Smelter Modernization", value: 12, color: "#722ed1", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Tin Smelting Facility Upgrade", value: 20, color: "#eb2f96", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Nickel Processing Complex", value: 15, color: "#f5222d", company: "PT Vale Indonesia Tbk" },
        { name: "PT Aneka Tambang Tbk - Bauxite Mining Operation", value: 22, color: "#fa541c", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Steam Power Plant Development", value: 19, color: "#faad14", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Copper Concentrate Plant", value: 26, color: "#a0d911", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Aluminum Rod Plant", value: 30, color: "#52c41a", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Offshore Mining Expansion", value: 28, color: "#13c2c2", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Nickel Matte Production", value: 21, color: "#1890ff", company: "PT Vale Indonesia Tbk" },
        { name: "PT Aneka Tambang Tbk - Gold Processing Facility", value: 17, color: "#2f54eb", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Coal Gasification Project", value: 25, color: "#722ed1", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Tailings Management System", value: 32, color: "#eb2f96", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Alumina Refinery", value: 29, color: "#f5222d", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Tin Chemicals Production", value: 14, color: "#fa541c", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Ferronickel Smelter", value: 11, color: "#faad14", company: "PT Vale Indonesia Tbk" },
      ]
    },

    // Progress Fisik R comparison data
    progress_fisik_r: {
      title: "%Progress Fisik R",
      description: "Physical completion percentage based on planned schedule (Rencana/Plan)",
      unit: "%",
      currency: "",
      projects: [
        { name: "PT Aneka Tambang Tbk - Nickel Laterite Processing Plant", value: 85, color: "#1890ff", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Coal Mine Expansion Phase III", value: 92, color: "#52c41a", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Underground Mining Development", value: 78, color: "#fa8c16", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Smelter Modernization", value: 65, color: "#722ed1", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Tin Smelting Facility Upgrade", value: 88, color: "#eb2f96", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Nickel Processing Complex", value: 95, color: "#f5222d", company: "PT Vale Indonesia Tbk" },
        { name: "PT Aneka Tambang Tbk - Bauxite Mining Operation", value: 82, color: "#fa541c", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Steam Power Plant Development", value: 90, color: "#faad14", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Copper Concentrate Plant", value: 87, color: "#a0d911", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Aluminum Rod Plant", value: 93, color: "#52c41a", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Offshore Mining Expansion", value: 89, color: "#13c2c2", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Nickel Matte Production", value: 76, color: "#1890ff", company: "PT Vale Indonesia Tbk" },
        { name: "PT Aneka Tambang Tbk - Gold Processing Facility", value: 84, color: "#2f54eb", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Coal Gasification Project", value: 91, color: "#722ed1", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Tailings Management System", value: 96, color: "#eb2f96", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Alumina Refinery", value: 88, color: "#f5222d", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Tin Chemicals Production", value: 72, color: "#fa541c", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Ferronickel Smelter", value: 68, color: "#faad14", company: "PT Vale Indonesia Tbk" },
      ]
    },

    // Progress Fisik A comparison data
    progress_fisik_a: {
      title: "%Progress Fisik A",
      description: "Actual physical completion percentage achieved to date (Aktual/Actual)",
      unit: "%",
      currency: "",
      projects: [
        { name: "PT Aneka Tambang Tbk - Nickel Laterite Processing Plant", value: 82, color: "#1890ff", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Coal Mine Expansion Phase III", value: 89, color: "#52c41a", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Underground Mining Development", value: 75, color: "#fa8c16", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Smelter Modernization", value: 62, color: "#722ed1", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Tin Smelting Facility Upgrade", value: 85, color: "#eb2f96", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Nickel Processing Complex", value: 92, color: "#f5222d", company: "PT Vale Indonesia Tbk" },
        { name: "PT Aneka Tambang Tbk - Bauxite Mining Operation", value: 79, color: "#fa541c", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Steam Power Plant Development", value: 87, color: "#faad14", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Copper Concentrate Plant", value: 84, color: "#a0d911", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Aluminum Rod Plant", value: 90, color: "#52c41a", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Offshore Mining Expansion", value: 86, color: "#13c2c2", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Nickel Matte Production", value: 73, color: "#1890ff", company: "PT Vale Indonesia Tbk" },
        { name: "PT Aneka Tambang Tbk - Gold Processing Facility", value: 81, color: "#2f54eb", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Coal Gasification Project", value: 88, color: "#722ed1", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Tailings Management System", value: 93, color: "#eb2f96", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Alumina Refinery", value: 85, color: "#f5222d", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Tin Chemicals Production", value: 69, color: "#fa541c", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Ferronickel Smelter", value: 65, color: "#faad14", company: "PT Vale Indonesia Tbk" },
      ]
    },

    // Anggaran Terserap R comparison data
    anggaran_terserap_r: {
      title: "Anggaran Terserap R",
      description: "Planned budget absorption according to project schedule (Rencana/Plan)",
      unit: "M",
      currency: "$",
      projects: [
        { name: "PT Aneka Tambang Tbk - Nickel Laterite Processing Plant", value: 5.8, color: "#1890ff", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Coal Mine Expansion Phase III", value: 7.2, color: "#52c41a", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Underground Mining Development", value: 5.4, color: "#fa8c16", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Smelter Modernization", value: 3.6, color: "#722ed1", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Tin Smelting Facility Upgrade", value: 5.5, color: "#eb2f96", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Nickel Processing Complex", value: 6.5, color: "#f5222d", company: "PT Vale Indonesia Tbk" },
        { name: "PT Aneka Tambang Tbk - Bauxite Mining Operation", value: 5.7, color: "#fa541c", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Steam Power Plant Development", value: 6.8, color: "#faad14", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Copper Concentrate Plant", value: 7.7, color: "#a0d911", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Aluminum Rod Plant", value: 8.9, color: "#52c41a", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Offshore Mining Expansion", value: 7.9, color: "#13c2c2", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Nickel Matte Production", value: 6.2, color: "#1890ff", company: "PT Vale Indonesia Tbk" },
        { name: "PT Aneka Tambang Tbk - Gold Processing Facility", value: 6.5, color: "#2f54eb", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Coal Gasification Project", value: 7.6, color: "#722ed1", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Tailings Management System", value: 9.2, color: "#eb2f96", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Alumina Refinery", value: 7.5, color: "#f5222d", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Tin Chemicals Production", value: 5.0, color: "#fa541c", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Ferronickel Smelter", value: 4.2, color: "#faad14", company: "PT Vale Indonesia Tbk" },
      ]
    },

    // Anggaran Terserap A comparison data
    anggaran_terserap_a: {
      title: "Anggaran Terserap A",
      description: "Actual budget absorbed and spent on project activities to date (Aktual/Actual)",
      unit: "M",
      currency: "$",
      projects: [
        { name: "PT Aneka Tambang Tbk - Nickel Laterite Processing Plant", value: 5.6, color: "#1890ff", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Coal Mine Expansion Phase III", value: 6.9, color: "#52c41a", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Underground Mining Development", value: 5.2, color: "#fa8c16", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Smelter Modernization", value: 3.4, color: "#722ed1", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Tin Smelting Facility Upgrade", value: 5.3, color: "#eb2f96", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Nickel Processing Complex", value: 6.3, color: "#f5222d", company: "PT Vale Indonesia Tbk" },
        { name: "PT Aneka Tambang Tbk - Bauxite Mining Operation", value: 5.5, color: "#fa541c", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Steam Power Plant Development", value: 6.5, color: "#faad14", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Copper Concentrate Plant", value: 7.4, color: "#a0d911", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Aluminum Rod Plant", value: 8.6, color: "#52c41a", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Offshore Mining Expansion", value: 7.6, color: "#13c2c2", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Nickel Matte Production", value: 6.0, color: "#1890ff", company: "PT Vale Indonesia Tbk" },
        { name: "PT Aneka Tambang Tbk - Gold Processing Facility", value: 6.3, color: "#2f54eb", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Coal Gasification Project", value: 7.4, color: "#722ed1", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Tailings Management System", value: 8.9, color: "#eb2f96", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Alumina Refinery", value: 7.2, color: "#f5222d", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Tin Chemicals Production", value: 4.8, color: "#fa541c", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Ferronickel Smelter", value: 4.0, color: "#faad14", company: "PT Vale Indonesia Tbk" },
      ]
    },

    // SPI comparison data
    spi: {
      title: "SPI (Schedule Performance Index)",
      description: "Schedule Performance Index - ratio of earned value to planned value (>1.0 = ahead of schedule, <1.0 = behind schedule)",
      unit: "",
      currency: "",
      projects: [
        { name: "PT Aneka Tambang Tbk - Nickel Laterite Processing Plant", value: 0.95, color: "#1890ff", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Coal Mine Expansion Phase III", value: 1.08, color: "#52c41a", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Underground Mining Development", value: 0.89, color: "#fa8c16", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Smelter Modernization", value: 0.78, color: "#722ed1", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Tin Smelting Facility Upgrade", value: 0.92, color: "#eb2f96", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Nickel Processing Complex", value: 1.12, color: "#f5222d", company: "PT Vale Indonesia Tbk" },
        { name: "PT Aneka Tambang Tbk - Bauxite Mining Operation", value: 0.87, color: "#fa541c", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Steam Power Plant Development", value: 1.05, color: "#faad14", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Copper Concentrate Plant", value: 0.98, color: "#a0d911", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Aluminum Rod Plant", value: 1.15, color: "#52c41a", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Offshore Mining Expansion", value: 1.02, color: "#13c2c2", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Nickel Matte Production", value: 0.85, color: "#1890ff", company: "PT Vale Indonesia Tbk" },
        { name: "PT Aneka Tambang Tbk - Gold Processing Facility", value: 0.93, color: "#2f54eb", company: "PT Aneka Tambang Tbk (ANTAM)" },
        { name: "PT Bukit Asam Tbk - Coal Gasification Project", value: 1.07, color: "#722ed1", company: "PT Bukit Asam Tbk" },
        { name: "PT Freeport Indonesia - Tailings Management System", value: 1.18, color: "#eb2f96", company: "PT Freeport Indonesia" },
        { name: "PT Indonesia Asahan Aluminium - Alumina Refinery", value: 1.01, color: "#f5222d", company: "PT Indonesia Asahan Aluminium (INALUM)" },
        { name: "PT Timah Tbk - Tin Chemicals Production", value: 0.82, color: "#fa541c", company: "PT Timah Tbk" },
        { name: "PT Vale Indonesia Tbk - Ferronickel Smelter", value: 0.75, color: "#faad14", company: "PT Vale Indonesia Tbk" },
      ]
    }
  },
  version: "1.0.0",
};

export default projectComparisonData;
