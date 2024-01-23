import { NewsType } from "../../types/NewsType.tsx";
import { NewsCard } from "../NewsCard/NewsCard.tsx";
import styles from "./NewsFeed.module.scss";
import { useNewsContext } from "../../context/NewsContext";

export function NewsFeed() {
  const { news } = useNewsContext();

  return (
    <>
      <div className={styles.newsFeed}>
        {news.map((newsCard: NewsType) => (
          <NewsCard key={newsCard.id} newsItem={newsCard} />
        ))}
      </div>
    </>
  );
}
