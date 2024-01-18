import { createContext, useContext } from "react";
import { NewsType } from "../types/NewsType";
import { data } from "../assets/data/data";

export type News = {
  news: NewsType[];
  setNews: (news: NewsType[]) => void;
};

export const NewsContext = createContext<News>({
  news: data,
  setNews: () => {},
});

export const useNewsContext = () => useContext(NewsContext);
