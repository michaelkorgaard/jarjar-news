import { useRef } from "react";
import styles from "./CreateComment.module.scss";
import { FaReply } from "react-icons/fa";
import jarjarImage from "../../assets/images/jarjar.png";
import { v4 as uuid } from "uuid";
import { CommentType } from "../../types/CommentType";
import { useNewsContext } from "../../context/NewsContext";
import { NewsType } from "../../types/NewsType";

type Props = {
  selectedId: string | undefined;
  toggleReply: () => void;
};

export function CreateComment({ selectedId, toggleReply }: Props) {
  const { news, setNews } = useNewsContext();

  const text = useRef<HTMLTextAreaElement>(null);
  const createdBy = "Jar jar";
  const createdImage = jarjarImage;
  const createdDate = new Date("2030-03-25");

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

    setReply(news, comment);
    toggleReply();
  }

  function setReply(params: NewsType[] | CommentType[], comment: CommentType) {
    params.forEach((item) => {
      if (item.id === selectedId) {
        item.comments.unshift(comment);
        const newNewsArray = [...news];
        setNews(newNewsArray);
      }
      setReply(item.comments, comment);
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
