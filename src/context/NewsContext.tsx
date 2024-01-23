import { createContext, useContext } from "react";
import { NewsType } from "../types/NewsType";

export type News = {
  news: NewsType[];
  setNews: (news: NewsType[]) => void;
};

export const NewsContext = createContext<News | null>(null);

export const useNewsContext = () => {
  const value = useContext(NewsContext);
  if (value === null) {
    throw new Error("Using useNewsContext outiside Context");
  }

  return value;
};
