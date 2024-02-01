import { useRef } from "react";
import styles from "./CreateComment.module.scss";
import { FaReply } from "react-icons/fa";
import { v4 as uuid } from "uuid";
import { CommentType } from "../../types/CommentType";
import { useNewsContext } from "../../context/NewsContext";
import { NewsType } from "../../types/NewsType";
import { useUserContext } from "../../context/UserContext";

type Props = {
  selectedId: string | undefined;
  toggleReply: () => void;
};

export function CreateComment({ selectedId, toggleReply }: Props) {
  const { news, setNews } = useNewsContext();
  const { currentUser } = useUserContext();

  if (currentUser === null) return null;

  const text = useRef<HTMLTextAreaElement>(null);
  const createdBy = currentUser.username;
  const createdImage = currentUser.image;
  const createdDate = new Date();

  function reply() {
    let comment: CommentType = {
      id: uuid(),
      text: text.current?.value,
      createdBy: createdBy,
      createdImage: createdImage,
      createdDate: createdDate,
      likes: 0,
      dislikes: 0,
      hate: 0,
      love: 0,
      comments: [],
    };

    setNews(updateNewsArray(news, selectedId, comment));
    toggleReply();
  }

  function updateNewsArray(
    items: (NewsType | CommentType)[],
    selectedId: string | undefined,
    comment?: CommentType
  ): (NewsType | CommentType)[] {
    return items.map((item) => {
      if (item.id === selectedId) {
        return {
          ...item,
          comments: comment ? [comment, ...item.comments] : [...item.comments],
        };
      } else if (item.comments.length > 0) {
        return {
          ...item,
          comments: updateNewsArray(item.comments, selectedId, comment),
        };
      }
      return item;
    });
  }

  return (
    <>
      <div className={styles.createComment}>
        <textarea className={styles.createComment__textarea} ref={text} />
        <button className={styles.createComment__button} onClick={reply}>
          <FaReply />
          Reply
        </button>
      </div>
    </>
  );
}
