// Initiative Project Pipeline Data
export const pipelineStages = {
  status_code: 200,
  data: {
    pipeline: {
      stages: [
        {
          id: "in_hpo",
          name: "In HPO",
          projects: [
            { 
              id: 1, 
              priority: "In HPO", 
              color: "#FFD700", 
              size: "large",
              name: "Gold Mining Expansion",
              company: "PT Aneka Tambang Tbk",
              budget: 580,
              type: "Gold",
              progress: 25
            },
            { 
              id: 2, 
              priority: "In HPO", 
              color: "#FF6B6B", 
              size: "large",
              name: "Nickel Processing Plant",
              company: "PT Vale Indonesia",
              budget: 720,
              type: "Nickel",
              progress: 30
            },
            { 
              id: 3, 
              priority: "In HPO", 
              color: "#9B59B6", 
              size: "small",
              name: "Coal Gasification",
              company: "PT Bukit Asam",
              budget: 180,
              type: "Coal",
              progress: 15
            }
          ]
        },
        {
          id: "fid", 
          name: "FID",
          projects: [
            { 
              id: 4, 
              priority: "FID", 
              color: "#9B59B6", 
              size: "medium",
              name: "Steam Power Plant",
              company: "PT Bukit Asam",
              budget: 450,
              type: "Coal",
              progress: 40
            },
            { 
              id: 5, 
              priority: "FID", 
              color: "#FFD700", 
              size: "medium",
              name: "Bauxite Mining",
              company: "PT Aneka Tambang Tbk",
              budget: 380,
              type: "Bauxite",
              progress: 35
            },
            { 
              id: 6, 
              priority: "FID", 
              color: "#FF6B6B", 
              size: "medium",
              name: "Ferronickel Smelter",
              company: "PT Vale Indonesia",
              budget: 520,
              type: "Nickel",
              progress: 45
            },
            { 
              id: 7, 
              priority: "FID", 
              color: "#4ECDC4", 
              size: "small",
              name: "Tin Processing",
              company: "PT Timah Tbk",
              budget: 220,
              type: "Tin",
              progress: 20
            },
            { 
              id: 8, 
              priority: "FID", 
              color: "#FFD700", 
              size: "small",
              name: "Gold Refinery",
              company: "PT Aneka Tambang Tbk",
              budget: 290,
              type: "Gold",
              progress: 55
            }
          ]
        },
        {
          id: "detail_engineering",
          name: "Detail Engineering", 
          projects: [
            { 
              id: 9, 
              priority: 4, 
              color: "#FFD700", 
              size: "medium",
              name: "Gold Processing Facility",
              company: "PT Aneka Tambang Tbk",
              budget: 420,
              type: "Gold",
              progress: 65
            },
            { 
              id: 10, 
              priority: 2, 
              color: "#4ECDC4", 
              size: "large",
              name: "Offshore Mining Platform",
              company: "PT Timah Tbk",
              budget: 850,
              type: "Tin",
              progress: 70
            },
            { 
              id: 11, 
              priority: 3, 
              color: "#FF6B6B", 
              size: "small",
              name: "Nickel Matte Production",
              company: "PT Vale Indonesia",
              budget: 320,
              type: "Nickel",
              progress: 60
            }
          ]
        },
        {
          id: "construction",
          name: "Construction",
          projects: [
            { 
              id: 12, 
              priority: 4, 
              color: "#FF6B6B", 
              size: "medium",
              name: "Underground Mining",
              company: "PT Freeport Indonesia",
              budget: 680,
              type: "Copper",
              progress: 75
            },
            { 
              id: 13, 
              priority: 3, 
              color: "#9B59B6", 
              size: "medium",
              name: "Coal Mine Expansion",
              company: "PT Bukit Asam",
              budget: 490,
              type: "Coal",
              progress: 80
            }
          ]
        },
        {
          id: "commissioning", 
          name: "Commissioning",
          projects: [
            { 
              id: 14, 
              priority: 2, 
              color: "#FF6B6B", 
              size: "medium",
              name: "Copper Concentrate Plant",
              company: "PT Freeport Indonesia",
              budget: 560,
              type: "Copper",
              progress: 85
            },
            { 
              id: 15, 
              priority: 4, 
              color: "#9B59B6", 
              size: "small",
              name: "Tin Smelting Facility",
              company: "PT Timah Tbk",
              budget: 280,
              type: "Tin",
              progress: 90
            }
          ]
        },
        {
          id: "operate_optimize",
          name: "Operate Optimize", 
          projects: [
            { 
              id: 16, 
              priority: 4, 
              color: "#9B59B6", 
              size: "small",
              name: "Alumina Refinery",
              company: "PT Indonesia Asahan Aluminium",
              budget: 240,
              type: "Aluminum",
              progress: 95
            }
          ]
        },
        {
          id: "ore_processing",
          name: "Ore Processing",
          projects: [
            { 
              id: 17, 
              priority: 5, 
              color: "#FFD700", 
              size: "small",
              name: "Gold Ore Processing",
              company: "PT Aneka Tambang Tbk",
              budget: 190,
              type: "Gold",
              progress: 98
            },
            { 
              id: 18, 
              priority: 2, 
              color: "#CD7F32", 
              size: "small",
              name: "Copper Extraction",
              company: "PT Freeport Indonesia",
              budget: 340,
              type: "Copper",
              progress: 92
            },
            { 
              id: 19, 
              priority: 3, 
              color: "#CD7F32", 
              size: "small",
              name: "Tailings Management",
              company: "PT Freeport Indonesia",
              budget: 450,
              type: "Copper",
              progress: 88
            },
            { 
              id: 20, 
              priority: 2, 
              color: "#CD7F32", 
              size: "small",
              name: "Smelter Modernization",
              company: "PT Indonesia Asahan Aluminium",
              budget: 380,
              type: "Aluminum",
              progress: 94
            },
            { 
              id: 21, 
              priority: 1, 
              color: "#CD7F32", 
              size: "small",
              name: "Aluminum Rod Plant",
              company: "PT Indonesia Asahan Aluminium",
              budget: 290,
              type: "Aluminum",
              progress: 96
            },
            { 
              id: 22, 
              priority: 4, 
              color: "#FF6B6B", 
              size: "small",
              name: "Nickel Laterite Processing",
              company: "PT Vale Indonesia",
              budget: 410,
              type: "Nickel",
              progress: 90
            }
          ]
        }
      ]
    },
    phases: {
      initiation: {
        title: "Initiation",
        projects: [
          {
            id: 1,
            name: "PT A",
            type: "Gold",
            priority: 1,
            color: "#FFD700"
          },
          {
            id: 2,
            name: "PT B", 
            type: "Gold",
            priority: 2,
            color: "#FFD700"
          }
        ]
      },
      planning: {
        title: "Planning",
        projects: [
          {
            id: 3,
            name: "PT A",
            type: "Gold", 
            priority: 3,
            color: "#FFD700"
          }
        ]
      },
      execution: {
        title: "Execution",
        projects: [
          {
            id: 4,
            name: "PT A",
            type: "Gold",
            priority: 4,
            color: "#FFD700"
          },
          {
            id: 5,
            name: "PT B",
            type: "Gold",
            priority: 5,
            color: "#FFD700"
          },
          {
            id: 6,
            name: "PT A",
            type: "Copper",
            priority: 1,
            color: "#CD7F32"
          },
          {
            id: 7,
            name: "PT B",
            type: "Copper",
            priority: 2,
            color: "#CD7F32"
          },
          {
            id: 8,
            name: "PT C",
            type: "Copper",
            priority: 3,
            color: "#CD7F32"
          }
        ]
      }
    },
    version: "1.0.0"
  }
};

export const getInitiativeProjectPipelineData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(pipelineStages);
    }, 100);
  });
};
