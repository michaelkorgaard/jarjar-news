import { useState } from "react";
import ActionButton from "../ActionButton/ActionButton";
import styles from "./ActionBar.module.scss";
import { FaReply } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import CreateComment from "../CreateComment/CreateComment";
import { CommentType } from "../../types/CommentType";

type Props = {
  newsId: string | undefined;
  onCreateComment: (
    updatedList: CommentType,
    newsId: string | undefined
  ) => void;
};

function ActionBar({ newsId, onCreateComment }: Props) {
  const [state, setState] = useState(false);

  function toggleReply() {
    setState(!state);
  }

  return (
    <>
      <div className={styles.actionBar}>
        <div className={styles.actionBar__left}>
          <ActionButton text="Like" />
          <ActionButton text="Dislike" />
        </div>
        <div className={styles.actionBar__right}>
          <button className={styles.actionBar__reply} onClick={toggleReply}>
            {!state && <FaReply />}
            {state && <MdCancel />}
            {state ? "Cancel" : "Reply"}
          </button>
          {state && (
            <CreateComment onCreateComment={onCreateComment} newsId={newsId} />
          )}
        </div>
      </div>
    </>
  );
}

export default ActionBar;
