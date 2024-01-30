import { useState } from "react";
import { ActionButton } from "../ActionButton/ActionButton";
import styles from "./ActionBar.module.scss";
import { FaReply } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { CreateComment } from "../CreateComment/CreateComment";

type Props = {
  selectedId: string | undefined;
};

export function ActionBar({ selectedId }: Props) {
  const [replyActivated, setReplyActivated] = useState(false);

  function toggleReply() {
    setReplyActivated(!replyActivated);
  }

  return (
    <>
      <div className={styles.actionBar}>
        <div className={styles.actionBar__left}>
          <ActionButton type="Like" selectedId={selectedId} />
          <ActionButton type="Dislike" selectedId={selectedId} />
          <ActionButton type="Hate" selectedId={selectedId} />
          <ActionButton type="Love" selectedId={selectedId} />
        </div>
        <div className={styles.actionBar__right}>
          <button className={styles.actionBar__reply} onClick={toggleReply}>
            {!replyActivated ? (
              <span>
                <FaReply /> Comment
              </span>
            ) : (
              <span>
                <MdCancel />
              </span>
            )}
          </button>
          {replyActivated && <CreateComment selectedId={selectedId} toggleReply={toggleReply} />}
        </div>
      </div>
    </>
  );
}
