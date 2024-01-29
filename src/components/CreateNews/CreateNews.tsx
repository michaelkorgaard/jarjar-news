import { useRef, FormEvent, useEffect } from "react";
import styles from "./CreateNews.module.scss";
import { IoClose } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";
import { Dates } from "../Dates/Dates";
import { v4 as uuid } from "uuid";
import jarjarImage from "../../assets/images/jarjar.png";
import { useSidebarContext } from "../../context/SidebarContext";
import { NewsType } from "../../types/NewsType";
import { useNewsContext } from "../../context/NewsContext";
import { useUserContext } from "../../context/UserContext";

export function CreateNews() {
  const { sidebarState, setSidebarState } = useSidebarContext();
  // const { user } = useUserContext();

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

  useEffect(() => {
    if (sidebarState) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [sidebarState]);

  function createNews(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let newsItem: NewsType = {
      id: uuid(),
      image: image,
      title: title.current?.value,
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

    const newNewsArray = [...news, newsItem];
    setNews(newNewsArray);
    setSidebarState(false);
    event.currentTarget.reset();
  }

  if (sidebarState === false) return null;

  return (
    <>
      <form
        aria-hidden={!sidebarState}
        onSubmit={createNews}
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
              type="button"
            >
              <IoClose />
            </button>
          </div>
          <div className={styles.createNews__date}>
            <Dates date={createdDate} />
          </div>
          <div className={styles.createNews__createdBy}>
            <span>Creator: </span>
            {/* {user?.username} */}
          </div>
          <div className={styles.createNews__title}>
            <label htmlFor="news_field_title">Title</label>
            <input id="news_field_title" ref={title} />
          </div>
          <div className={styles.createNews__body}>
            <label htmlFor="news_field_body">Body</label>
            <textarea id="news_field_body" ref={text} />
          </div>
          <button className={styles.createNews__button} type="submit">
            <FaPlusCircle />
            Create news
          </button>
        </div>
      </form>
    </>
  );
}
