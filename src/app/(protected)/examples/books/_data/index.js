export const allBooks = {
  status_code: 200,
  data: {
    items: [
      {
        id: "1",
        title: "To Kill a Mockingbird",
        publicationDate: "1960-07-11",
        author: "Harper Lee",
        totalCopies: 50,
        createdAt: "2023-10-01T00:00:00.000Z",
        updatedAt: "2023-10-01T00:00:00.000Z",
      },
      {
        id: "2",
        title: "1984",
        publicationDate: "1949-06-08",
        author: "George Orwell",
        totalCopies: 75,
        createdAt: "2023-10-02T00:00:00.000Z",
        updatedAt: "2023-10-02T00:00:00.000Z",
      },
      {
        id: "3",
        title: "Pride and Prejudice",
        publicationDate: "1813-01-28",
        author: "Jane Austen",
        totalCopies: 40,
        createdAt: "2023-10-03T00:00:00.000Z",
        updatedAt: "2023-10-03T00:00:00.000Z",
      },
      {
        id: "4",
        title: "The Great Gatsby",
        publicationDate: "1925-04-10",
        author: "F. Scott Fitzgerald",
        totalCopies: 60,
        createdAt: "2023-10-04T00:00:00.000Z",
        updatedAt: "2023-10-04T00:00:00.000Z",
      },
      {
        id: "5",
        title: "The Catcher in the Rye",
        publicationDate: "1951-07-16",
        author: "J.D. Salinger",
        totalCopies: 55,
        createdAt: "2023-10-05T00:00:00.000Z",
        updatedAt: "2023-10-05T00:00:00.000Z",
      },
      {
        id: "6",
        title: "Lord of the Flies",
        publicationDate: "1954-09-17",
        author: "William Golding",
        totalCopies: 65,
        createdAt: "2023-10-06T00:00:00.000Z",
        updatedAt: "2023-10-06T00:00:00.000Z",
      },
      {
        id: "7",
        title: "The Hobbit",
        publicationDate: "1937-09-21",
        author: "J.R.R. Tolkien",
        totalCopies: 80,
        createdAt: "2023-10-07T00:00:00.000Z",
        updatedAt: "2023-10-07T00:00:00.000Z",
      },
      {
        id: "8",
        title: "Brave New World",
        publicationDate: "1932-06-01",
        author: "Aldous Huxley",
        totalCopies: 45,
        createdAt: "2023-10-08T00:00:00.000Z",
        updatedAt: "2023-10-08T00:00:00.000Z",
      },
      {
        id: "9",
        title: "The Alchemist",
        publicationDate: "1988-06-01",
        author: "Paulo Coelho",
        totalCopies: 55,
        createdAt: "2023-10-09T00:00:00.000Z",
        updatedAt: "2023-10-09T00:00:00.000Z",
      },
      {
        id: "10",
        title: "Harry Potter and the Philosopher's Stone",
        publicationDate: "1997-06-26",
        author: "J.K. Rowling",
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

export const bookDetail = (id) => {
  const letter = allBooks.data.items.find((item) => item.id === id);

  return {
    status_code: 200,
    data: letter || null,
    version: "1.0.0",
  };
};
