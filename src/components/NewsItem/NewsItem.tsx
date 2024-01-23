import { useParams } from "react-router-dom";
import styles from "./Newsitem.module.scss";
import { Comment } from "../Comment/Comment.tsx";
import { Avatar } from "../Avatar/Avatar.tsx";
import { ActionBar } from "../ActionBar/ActionBar.tsx";
import { Dates } from "../Dates/Dates.tsx";
import { CommentType } from "../../types/CommentType.tsx";
import { useNewsContext } from "../../context/NewsContext.tsx";

export function NewsItem() {
  let { id } = useParams();
  const { news } = useNewsContext();
  const selectedNewsItem = news.find((newsItem) => newsItem.id === id);

  return (
    <>
      <div className={styles.newsItem}>
        <img className={styles.newsItem__img} src={selectedNewsItem?.image} />
        <div className={styles.newsItem__inner}>
          <div className={styles.newsItem__top}>
            <div>
              <div className={styles.newsItem__createdDate}>
                <Dates date={selectedNewsItem?.createdDate} />
              </div>
              <div className={styles.newsItem__title}>
                {selectedNewsItem?.title}
              </div>
            </div>
            <div>
              <div className={styles.newsItem__created}>
                <div className={styles.newsItem__createdBy}>
                  {selectedNewsItem?.createdBy}
                </div>
                <Avatar avatar={selectedNewsItem?.createdImage} />
              </div>
            </div>
          </div>
          <div className={styles.newsItem__text}>{selectedNewsItem?.text}</div>
        </div>
      </div>

      <ActionBar selectedId={selectedNewsItem?.id} />

      {selectedNewsItem?.comments && (
        <div className={styles.newsItem__comments}>Comments:</div>
      )}

      {selectedNewsItem?.comments.map((comment: CommentType) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </>
  );
}
