export const allKurs = {
  status_code: 200,
  data: {
    items: [
      {
        id: "10",
        nilai_kurs: "15690",
        tanggal: "2023-10-11",
        status: "Active",
        created_at: "2023-10-11T00:00:00.000Z",
        updated_at: "2023-10-11T00:00:00.000Z",
      },
      {
        id: "9",
        nilai_kurs: "15320",
        tanggal: "2023-09-20",
        status: "Inactive",
        created_at: "2023-09-20T00:00:00.000Z",
        updated_at: "2023-09-20T00:00:00.000Z",
      },
      {
        id: "8",
        nilai_kurs: "15450",
        tanggal: "2023-08-14",
        status: "Inactive",
        created_at: "2023-08-14T00:00:00.000Z",
        updated_at: "2023-08-14T00:00:00.000Z",
      },
      {
        id: "7",
        nilai_kurs: "15580",
        tanggal: "2023-07-08",
        status: "Inactive",
        created_at: "2023-07-08T00:00:00.000Z",
        updated_at: "2023-07-08T00:00:00.000Z",
      },
      {
        id: "6",
        nilai_kurs: "15720",
        tanggal: "2023-06-22",
        status: "Inactive",
        created_at: "2023-06-22T00:00:00.000Z",
        updated_at: "2023-06-22T00:00:00.000Z",
      },
      {
        id: "5",
        nilai_kurs: "15650",
        tanggal: "2023-05-18",
        status: "Inactive",
        created_at: "2023-05-18T00:00:00.000Z",
        updated_at: "2023-05-18T00:00:00.000Z",
      },
      {
        id: "4",
        nilai_kurs: "15180",
        tanggal: "2023-04-12",
        status: "Inactive",
        created_at: "2023-04-12T00:00:00.000Z",
        updated_at: "2023-04-12T00:00:00.000Z",
      },
      {
        id: "3",
        nilai_kurs: "15420",
        tanggal: "2023-03-05",
        status: "Inactive",
        created_at: "2023-03-05T00:00:00.000Z",
        updated_at: "2023-03-05T00:00:00.000Z",
      },
      {
        id: "2",
        nilai_kurs: "15380",
        tanggal: "2023-02-10",
        status: "Inactive",
        created_at: "2023-02-10T00:00:00.000Z",
        updated_at: "2023-02-10T00:00:00.000Z",
      },
      {
        id: "1",
        nilai_kurs: "15250",
        tanggal: "2023-01-15",
        status: "Inactive",
        created_at: "2023-01-15T00:00:00.000Z",
        updated_at: "2023-01-15T00:00:00.000Z",
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

export const kursDetail = (id) => {
  const kurs = allKurs.data.items.find((item) => item.id === id);

  return {
    status_code: 200,
    data: kurs || null,
    version: "1.0.0",
  };
};
