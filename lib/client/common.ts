export function cls(...str: string[]) {
  return str.join(" ");
}

export interface Book {
  imageUrl: string;
  title: string;
  author: string;
  score: string;
}
