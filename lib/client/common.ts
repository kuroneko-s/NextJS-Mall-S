export function cls(...str: string[]) {
  return str.join(" ");
}

export const BookSample: Book[] = [
  {
    id: "1",
    imageUrl: "red",
    author: "test",
    score: "0",
    title: "test 서적 1",
  },
  {
    id: "2",
    imageUrl: "blue",
    author: "test",
    score: "5",
    title: "test 서적 1",
  },
  {
    id: "3",
    imageUrl: "pink",
    author: "test",
    score: "5",
    title: "test 서적 1",
  },
  {
    id: "4",
    imageUrl: "yellow",
    author: "test",
    score: "5",
    title: "test 서적 1",
  },
  {
    id: "5",
    imageUrl: "green",
    author: "test",
    score: "5",
    title: "test 서적 1",
  },
  {
    id: "6",
    imageUrl: "gray",
    author: "test",
    score: "5",
    title: "test 서적 1",
  },
];

export interface Book {
  id: string;
  imageUrl: string;
  title: string;
  author: string;
  score: string;
}
