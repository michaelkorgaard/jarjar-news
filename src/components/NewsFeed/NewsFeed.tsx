import { NewsInterface } from "../../assets/data/data.tsx";
import CreateNews from "../CreateNews/CreateNews.tsx";
import NewsCard from "../NewsCard/NewsCard.tsx";
import styles from "./NewsFeed.module.scss";

type Props = {
  newsArray: NewsInterface[];
  onCreateNewsItem: (createdNewsItem: NewsInterface) => void;
  onDeleteNewsItem: (deletedNewsItem: string) => void;
};

function NewsFeed({ newsArray, onCreateNewsItem, onDeleteNewsItem }: Props) {
  return (
    <>
      <div className={styles.newsFeed}>
        {newsArray.map((newsCard: NewsInterface) => (
          <NewsCard
            key={newsCard.id}
            newsItem={newsCard}
            onDeleteNewsItem={onDeleteNewsItem}
          />
        ))}
      </div>
      <CreateNews onCreateNewsItem={onCreateNewsItem} />
    </>
  );
}

export default NewsFeed;
