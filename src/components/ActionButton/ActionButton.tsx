import styles from "./ActionButton.module.scss";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useNewsContext } from "../../context/NewsContext";
import { NewsType } from "../../types/NewsType";
import { CommentType } from "../../types/CommentType";

type Props = {
  type: string;
  selectedId: string | undefined;
};

function ActionButton({ type, selectedId }: Props) {
  const { news } = useNewsContext();
  let icon = getIcon(type);
  let [count, setCount] = useState(0);
  let [upvoted, setUpvoted] = useState(false);

  function getCount(params: NewsType[] | CommentType[]) {
    params.forEach((item) => {
      if (item.id === selectedId) {
        if (type === "Like") {
          setCount(item.likes);
        } else {
          setCount(item.dislikes);
        }
      }
      if (item.comments !== undefined) {
        getCount(item.comments);
      }
    });
  }

  useEffect(() => {
    getCount(news);
  }, []);

  function vote() {
    setUpvoted(true);
    if (!upvoted) {
      setCount(count + 1);
    } else {
      setCount(count - 1);
      setUpvoted(false);
    }
  }

  function getIcon(text: string) {
    switch (text) {
      case "Like":
        return <AiFillLike />;
      case "Dislike":
        return <AiFillDislike />;
      default:
        break;
    }
    return text;
  }

  return (
    <>
      <button className={styles.actionButton} onClick={vote}>
        {icon}
        {count}
      </button>
    </>
  );
}

export default ActionButton;
