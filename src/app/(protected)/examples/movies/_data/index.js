export const allMovies = {
  status_code: 200,
  data: {
    items: [
      {
        id: "1",
        title: "Inception",
        releaseDate: "2010-07-16",
        director: "Christopher Nolan",
        totalCopies: 50,
        createdAt: "2023-10-01T00:00:00.000Z",
        updatedAt: "2023-10-01T00:00:00.000Z",
      },
      {
        id: "2",
        title: "The Matrix",
        releaseDate: "1999-03-31",
        director: "Lana Wachowski",
        totalCopies: 75,
        createdAt: "2023-10-02T00:00:00.000Z",
        updatedAt: "2023-10-02T00:00:00.000Z",
      },
      {
        id: "3",
        title: "Interstellar",
        releaseDate: "2014-11-07",
        director: "Christopher Nolan",
        totalCopies: 40,
        createdAt: "2023-10-03T00:00:00.000Z",
        updatedAt: "2023-10-03T00:00:00.000Z",
      },
      {
        id: "4",
        title: "Pulp Fiction",
        releaseDate: "1994-10-14",
        director: "Quentin Tarantino",
        totalCopies: 60,
        createdAt: "2023-10-04T00:00:00.000Z",
        updatedAt: "2023-10-04T00:00:00.000Z",
      },
      {
        id: "5",
        title: "The Shawshank Redemption",
        releaseDate: "1994-09-23",
        director: "Frank Darabont",
        totalCopies: 55,
        createdAt: "2023-10-05T00:00:00.000Z",
        updatedAt: "2023-10-05T00:00:00.000Z",
      },
      {
        id: "6",
        title: "Forrest Gump",
        releaseDate: "1994-07-06",
        director: "Robert Zemeckis",
        totalCopies: 65,
        createdAt: "2023-10-06T00:00:00.000Z",
        updatedAt: "2023-10-06T00:00:00.000Z",
      },
      {
        id: "7",
        title: "The Dark Knight",
        releaseDate: "2008-07-18",
        director: "Christopher Nolan",
        totalCopies: 80,
        createdAt: "2023-10-07T00:00:00.000Z",
        updatedAt: "2023-10-07T00:00:00.000Z",
      },
      {
        id: "8",
        title: "Goodfellas",
        releaseDate: "1990-09-19",
        director: "Martin Scorsese",
        totalCopies: 45,
        createdAt: "2023-10-08T00:00:00.000Z",
        updatedAt: "2023-10-08T00:00:00.000Z",
      },
      {
        id: "9",
        title: "Fight Club",
        releaseDate: "1999-10-15",
        director: "David Fincher",
        totalCopies: 55,
        createdAt: "2023-10-09T00:00:00.000Z",
        updatedAt: "2023-10-09T00:00:00.000Z",
      },
      {
        id: "10",
        title: "The Godfather",
        releaseDate: "1972-03-24",
        director: "Francis Ford Coppola",
        totalCopies: 70,
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

export const trendingMovies = {
  status_code: 200,
  data: {
    items: [
      {
        id: "1",
        title: "Inception",
        releaseDate: "2010-07-16",
        director: "Christopher Nolan",
        viewsThisMonth: 5000,
        socialMentions: 12500,
        createdAt: "2023-10-01T00:00:00.000Z",
        updatedAt: "2023-10-01T00:00:00.000Z",
      },
      {
        id: "7",
        title: "The Dark Knight",
        releaseDate: "2008-07-18",
        director: "Christopher Nolan",
        viewsThisMonth: 4800,
        socialMentions: 11200,
        createdAt: "2023-10-07T00:00:00.000Z",
        updatedAt: "2023-10-07T00:00:00.000Z",
      },
      {
        id: "3",
        title: "Interstellar",
        releaseDate: "2014-11-07",
        director: "Christopher Nolan",
        viewsThisMonth: 4500,
        socialMentions: 10000,
        createdAt: "2023-10-03T00:00:00.000Z",
        updatedAt: "2023-10-03T00:00:00.000Z",
      },
    ],
    meta: {
      total_page: 1,
      total: 3,
      page: 1,
      per_page: 10,
    },
  },
  version: "1.0.0",
};

export const movieDetail = (id) => {
  const letter = allMovies.data.items.find((item) => item.id === id);

  return {
    status_code: 200,
    data: letter || null,
    version: "1.0.0",
  };
};
