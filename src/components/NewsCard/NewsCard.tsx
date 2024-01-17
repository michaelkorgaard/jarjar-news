import { NewsInterface } from "../../assets/data/data.tsx";
import { Link } from "react-router-dom";
import styles from "./NewsCard.module.scss";
import Avatar from "../Avatar/Avatar.tsx";
import Dates from "../Dates/Dates.tsx";
import { MdDelete } from "react-icons/md";

type Props = {
  newsItem: NewsInterface;
  onDeleteNewsItem: (deletedNewsItem: string) => void;
};

function NewsCard({ newsItem, onDeleteNewsItem }: Props) {
  const deleteNewsItem = (event: any) => {
    onDeleteNewsItem(newsItem.id);
    event.stopPropagation();
  };

  return (
    <>
      <Link className={styles.newsCard} to={"/news-item/" + newsItem.id}>
        <div className={styles.newsCard__imageWrapper}>
          <img className={styles.newsCard__image} src={newsItem.image} />
        </div>
        <div className={styles.newsCard__inner}>
          <div className={styles.newsCard__title}>{newsItem.title}</div>
          <div className={styles.newsCard__text}>{newsItem.text}</div>
          <div className={styles.newsCard__created}>
            <Avatar avatar={newsItem.createdImage} />
            <div className={styles.newsCard__createdBy}>
              {newsItem.createdBy}
            </div>
          </div>
          <div className={styles.newsCard__createdDate}>
            <Dates date={newsItem.createdDate} />
          </div>
          <button className={styles.newsCard__delete} onClick={deleteNewsItem}>
            <MdDelete />
          </button>
        </div>
      </Link>
    </>
  );
}

export default NewsCard;
