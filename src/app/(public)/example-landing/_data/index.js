export const allProductLending = {
  status_code: 200,
  data: {
    items: [
      {
        id: "1",
        code: "PL001",
        name: "Laptop Dell XPS 13",
        qty: 25,
        status: "Available",
        category: "Laptop",
        totalItems: 3,
        items: [
          { id: "1", name: "Charger" },
          { id: "2", name: "Mouse" },
          { id: "3", name: "Bag" }
        ],
        createdAt: "2023-10-01T00:00:00.000Z",
        updatedAt: "2023-10-01T00:00:00.000Z",
      },
      {
        id: "2",
        code: "PL002",
        name: "MacBook Pro M2",
        qty: 15,
        status: "Limited",
        category: "Laptop",
        totalItems: 4,
        items: [
          { id: "1", name: "Charger" },
          { id: "2", name: "Magic Mouse" },
          { id: "3", name: "Sleeve Case" },
          { id: "4", name: "USB-C Hub" }
        ],
        createdAt: "2023-10-02T00:00:00.000Z",
        updatedAt: "2023-10-02T00:00:00.000Z",
      },
      {
        id: "3",
        code: "PL003",
        name: "HP Spectre x360",
        qty: 10,
        status: "Limited",
        category: "Laptop",
        totalItems: 2,
        items: [
          { id: "1", name: "Charger" },
          { id: "2", name: "Stylus Pen" }
        ],
        createdAt: "2023-10-03T00:00:00.000Z",
        updatedAt: "2023-10-03T00:00:00.000Z",
      },
      {
        id: "4",
        code: "PL004",
        name: "iPhone 15 Pro",
        qty: 30,
        status: "Available",
        category: "Smartphone",
        totalItems: 3,
        items: [
          { id: "1", name: "Charger" },
          { id: "2", name: "Case" },
          { id: "3", name: "Screen Protector" }
        ],
        createdAt: "2023-10-04T00:00:00.000Z",
        updatedAt: "2023-10-04T00:00:00.000Z",
      },
      {
        id: "5",
        code: "PL005",
        name: "Samsung Galaxy S23",
        qty: 20,
        status: "Available",
        category: "Smartphone",
        totalItems: 3,
        items: [
          { id: "1", name: "Charger" },
          { id: "2", name: "Case" },
          { id: "3", name: "Screen Protector" }
        ],
        createdAt: "2023-10-05T00:00:00.000Z",
        updatedAt: "2023-10-05T00:00:00.000Z",
      },
      {
        id: "6",
        code: "PL006",
        name: "iPad Pro 12.9",
        qty: 12,
        status: "Limited",
        category: "Tablet",
        totalItems: 3,
        items: [
          { id: "1", name: "Charger" },
          { id: "2", name: "Apple Pencil" },
          { id: "3", name: "Smart Keyboard" }
        ],
        createdAt: "2023-10-06T00:00:00.000Z",
        updatedAt: "2023-10-06T00:00:00.000Z",
      },
      {
        id: "7",
        code: "PL007",
        name: "Microsoft Surface Pro",
        qty: 8,
        status: "Out of Stock",
        category: "Tablet",
        totalItems: 3,
        items: [
          { id: "1", name: "Charger" },
          { id: "2", name: "Surface Pen" },
          { id: "3", name: "Type Cover" }
        ],
        createdAt: "2023-10-07T00:00:00.000Z",
        updatedAt: "2023-10-07T00:00:00.000Z",
      },
      {
        id: "8",
        code: "PL008",
        name: "Logitech MX Master 3",
        qty: 40,
        status: "Available",
        category: "Accessory",
        totalItems: 1,
        items: [
          { id: "1", name: "USB Receiver" }
        ],
        createdAt: "2023-10-08T00:00:00.000Z",
        updatedAt: "2023-10-08T00:00:00.000Z",
      },
      {
        id: "9",
        code: "PL009",
        name: "Dell UltraSharp 27 Monitor",
        qty: 15,
        status: "Available",
        category: "Monitor",
        totalItems: 2,
        items: [
          { id: "1", name: "HDMI Cable" },
          { id: "2", name: "DisplayPort Cable" }
        ],
        createdAt: "2023-10-09T00:00:00.000Z",
        updatedAt: "2023-10-09T00:00:00.000Z",
      },
      {
        id: "10",
        code: "PL010",
        name: "Bose QuietComfort Earbuds",
        qty: 25,
        status: "Available",
        category: "Audio",
        totalItems: 2,
        items: [
          { id: "1", name: "Charging Case" },
          { id: "2", name: "Ear Tips" }
        ],
        createdAt: "2023-10-10T00:00:00.000Z",
        updatedAt: "2023-10-10T00:00:00.000Z",
      },
    ],
    meta: {
      total_page: 1,
      total: 10,
      page: 1,
      per_page: 10,
    },
  },
  version: "1.0.0",
};

export const productLendingDetail = (id) => {
  const product = allProductLending.data.items.find((item) => item.id === id);

  return {
    status_code: 200,
    data: product || null,
    version: "1.0.0",
  };
};
