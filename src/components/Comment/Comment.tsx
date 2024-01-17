import { CommentInterface } from "../../assets/data/data.tsx";
import styles from "./Comment.module.scss";
import Avatar from "../Avatar/Avatar.tsx";
import Dates from "../Dates/Dates.tsx";

function Comment({
  text,
  createdBy,
  createdImage,
  createdDate,
}: CommentInterface) {
  return (
    <>
      <div className={styles.comment}>
        <div className={styles.comment__image}>
          <Avatar avatar={createdImage} />
        </div>
        <div className={styles.comment__content}>
          <div className={styles.comment__top}>
            <div className={styles.comment__createdBy}>{createdBy}</div>
            <div className={styles.comment__createdDate}>
              <Dates date={createdDate} />
            </div>
          </div>
          <div className={styles.comment__text}>{text}</div>
        </div>
      </div>
    </>
  );
}

export default Comment;
