import { Author } from "./user";

export type Comment = {
  id: number;
  content: string;
  author?: Author;
  created_at: string;
  updated_at: string;
};

export type Rating = {
  id: number;
  rating: number;
  author?: Author;
  created_at: string;
};
