import { useParams } from "react-router-dom";
import styles from "./Newsitem.module.scss";
import { NewsInterface, CommentInterface } from "../../assets/data/data.tsx";
import Comment from "../Comment/Comment.tsx";
import Avatar from "../Avatar/Avatar.tsx";
import ActionBar from "../ActionBar/ActionBar.tsx";
import Dates from "../Dates/Dates.tsx";
// import { useEffect, useState } from "react";

type Props = {
  newsArray: NewsInterface[];
  onCreateComment: (
    updatedList: CommentInterface,
    newsId: string | undefined
  ) => void;
};

function NewsItem({ newsArray, onCreateComment }: Props) {
  let { id } = useParams();

  const selectedNewsItem = newsArray.find((newsItem) => newsItem.id === id);

  // const [selectedNewsItem, setSelectedNewsItem] = useState(
  //   newsArray.find((newsItem) => newsItem.id === id)
  // );

  // useEffect(() => {
  //   const data = window.localStorage.getItem("MY_KEY");
  //   if (data !== null) {
  //     setSelectedNewsItem(JSON.parse(data));
  //   }
  // }, []);

  // useEffect(() => {
  //   if (selectedNewsItem !== undefined) {
  //     window.localStorage.setItem("MY_KEY", JSON.stringify(selectedNewsItem));
  //   } else {
  //     window.localStorage.removeItem("MY_KEY");
  //   }
  // }, [selectedNewsItem]);

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

      <ActionBar
        onCreateComment={onCreateComment}
        newsId={selectedNewsItem?.id}
      />

      {selectedNewsItem?.comments && (
        <div className={styles.newsItem__comments}>Comments:</div>
      )}

      {selectedNewsItem?.comments?.map((comment: CommentInterface) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </>
  );
}

export default NewsItem;