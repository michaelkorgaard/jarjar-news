import styles from "./Comment.module.scss";
import { Dates } from "../Dates/Dates.tsx";
import { CommentType } from "../../types/CommentType.tsx";
import { Avatar } from "../Avatar/Avatar.tsx";
import { ActionBar } from "../ActionBar/ActionBar.tsx";

export function Comment({ id, text, createdBy, createdImage, createdDate, comments }: CommentType) {
  return (
    <>
      <div className={styles.comment}>
        <div className={styles.comment__area}>
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

        <div className={styles.comment__comments}>
          <ActionBar selectedId={id} />

          {comments.length > 0 && <div className={styles.comment__commentsTitle}>Comments:</div>}

          {comments.reverse().map((comment: CommentType) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </div>
      </div>
    </>
  );
}
