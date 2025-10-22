export const makeSource = (source) => {
  if (!source || !source.data) {
    return {
      data: [],
      meta: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
    };
  }
  
  return {
    data: source.data.items || [],
    meta: {
      page: source.data.meta?.page || 1,
      pageSize: source.data.meta?.per_page || 10,
      total: source.data.meta?.total || 0,
    },
  };
};
