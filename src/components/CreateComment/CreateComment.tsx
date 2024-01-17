import { useRef } from "react";
import styles from "./CreateComment.module.scss";
import { FaReply } from "react-icons/fa";
import jarjarImage from "../../assets/images/jarjar.png";
import { v4 as uuid } from "uuid";
import { CommentInterface } from "../../assets/data/data";

type Props = {
  newsId: string | undefined;
  onCreateComment: (
    updatedList: CommentInterface,
    newsId: string | undefined
  ) => void;
};

function CreateComment({ newsId, onCreateComment }: Props) {
  const text = useRef<HTMLTextAreaElement>(null);
  const createdBy = "Jar jar";
  const createdImage = jarjarImage;
  const createdDate = new Date();

  function reply() {
    let comment: CommentInterface = {
      id: uuid(),
      text: text.current?.value,
      createdBy: createdBy,
      createdImage: createdImage,
      createdDate: createdDate,
    };

    onCreateComment(comment, newsId);
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

export default CreateComment;
