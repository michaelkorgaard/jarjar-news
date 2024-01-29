import styles from "./ActionButton.module.scss";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { useState } from "react";
import { useNewsContext } from "../../context/NewsContext";
import { ImAngry2 } from "react-icons/im";
import { FaHeart } from "react-icons/fa";
import { NewsType } from "../../types/NewsType";
import { CommentType } from "../../types/CommentType";

type Props = {
  type: string;
  selectedId: string | undefined;
};

export function ActionButton({ type, selectedId }: Props) {
  const { news, setNews } = useNewsContext();
  let [upvoted, setUpvoted] = useState(false);
  let count = 0;
  let icon = <AiFillLike />;
  let propertyName = "likes";

  const filterData = (
    news: (NewsType | CommentType)[]
  ): NewsType | CommentType | undefined => {
    for (const newsItem of news) {
      if (newsItem.id === selectedId) {
        return newsItem;
      }
      const comment = filterData(newsItem.comments);
      if (comment) {
        return comment;
      }
    }
    return undefined;
  };

  const selectedItem = filterData(news);

  if (selectedItem === undefined) {
    return null;
  }

  switch (type) {
    case "Like":
      count = selectedItem.likes;
      icon = <AiFillLike />;
      break;
    case "Dislike":
      count = selectedItem.dislikes;
      icon = <AiFillDislike />;
      propertyName = "dislikes";
      break;
    case "Hate":
      count = selectedItem.hate;
      icon = <ImAngry2 />;
      propertyName = "hate";
      break;
    case "Love":
      count = selectedItem.love;
      icon = <FaHeart />;
      propertyName = "love";
      break;
    default:
      break;
  }

  function vote() {
    if (selectedItem) {
      if (!upvoted) {
        setVote(selectedItem, count + 1);
        setUpvoted(true);
      } else {
        setVote(selectedItem, count - 1);
        setUpvoted(false);
      }
    }
  }

  function setVote(selectedItem: NewsType | CommentType, count: number) {
    const newNewsArray = updateItemInArray(news, selectedItem, count);
    setNews(newNewsArray);
  }

  function updateItemInArray(
    news: (NewsType | CommentType)[],
    selectedItem: NewsType | CommentType,
    count: number
  ): (NewsType | CommentType)[] {
    return news.map((newsItem) => {
      if (newsItem.id === selectedItem.id) {
        return { ...newsItem, [propertyName]: count };
      } else if (newsItem.comments.length > 0) {
        return {
          ...newsItem,
          comments: updateItemInArray(newsItem.comments, selectedItem, count),
        };
      } else {
        return newsItem;
      }
    });
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
