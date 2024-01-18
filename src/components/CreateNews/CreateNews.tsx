import { useRef } from "react";
import styles from "./CreateNews.module.scss";
import { IoClose } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";
import Dates from "../Dates/Dates";
import { v4 as uuid } from "uuid";
import jarjarImage from "../../assets/images/jarjar.png";
import { useSidebarContext } from "../../context/SidebarContext";
import { NewsType } from "../../types/NewsType";
import { useNewsContext } from "../../context/NewsContext";

function CreateNews() {
  const { sidebarState, setSidebarState } = useSidebarContext();

  const { news, setNews } = useNewsContext();

  function toggleCreateNews() {
    setSidebarState(!sidebarState);
  }

  const image = "https://placehold.it/2000x1000";
  const title = useRef<HTMLInputElement>(null);
  const text = useRef<HTMLTextAreaElement>(null);
  const createdBy = "Jar jar";
  const createdImage = jarjarImage;
  const createdDate = new Date();

  function createNews() {
    let newsItem: NewsType = {
      id: uuid(),
      image: image,
      title: title.current?.value,
      text: text.current?.value,
      createdBy: createdBy,
      createdImage: createdImage,
      createdDate: createdDate,
    };

    const newNewsArray = [...news, newsItem];
    setNews(newNewsArray);
  }

  return (
    <>
      <div
        className={`${styles.createNews} ${
          sidebarState && styles.createNews__open
        }`}
      >
        <div className={styles.createNews__inner}>
          <div className={styles.createNews__top}>
            <div className={styles.createNews__header}>Create news</div>
            <button
              className={styles.createNews__close}
              onClick={toggleCreateNews}
            >
              <IoClose />
            </button>
          </div>
          <div className={styles.createNews__date}>
            <Dates date={createdDate} />
          </div>
          <div className={styles.createNews__title}>
            <input ref={title} />
          </div>
          <div className={styles.createNews__body}>
            <textarea ref={text} />
          </div>
          <button className={styles.createNews__button} onClick={createNews}>
            <FaPlusCircle />
            Create news
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateNews;
