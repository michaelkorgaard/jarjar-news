import { useRef, FormEvent, useEffect } from "react";
import styles from "./CreateNews.module.scss";
import { IoClose } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";
import { Dates } from "../Dates/Dates";
import { v4 as uuid } from "uuid";
import { useSidebarContext } from "../../context/SidebarContext";
import { NewsType } from "../../types/NewsType";
import { useNewsContext } from "../../context/NewsContext";
import { useUserContext } from "../../context/UserContext";
import { Avatar } from "../Avatar/Avatar";
import db from "../../assets/data/db";

export function CreateNews() {
  const { sidebarState, setSidebarState } = useSidebarContext();
  const { currentUser } = useUserContext();
  const { news, setNews } = useNewsContext();

  useEffect(() => {
    if (sidebarState) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [sidebarState]);

  const imageRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  if (!sidebarState) return null;
  if (!currentUser) return null;

  const createdBy = currentUser.username;
  const createdImage = currentUser.image;
  const createdDate = new Date();

  async function createNews(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const image = imageRef.current?.value;
    const title = titleRef.current?.value;
    const text = textRef.current?.value;

    let newsItem: NewsType = {
      id: uuid(),
      image: image,
      title: title,
      text: text,
      createdBy: createdBy,
      createdImage: createdImage,
      createdDate: new Date(),
      likes: 0,
      dislikes: 0,
      hate: 0,
      love: 0,
      comments: [],
    };

    const newNewsArray = [...news, newsItem];
    setNews(newNewsArray);

    await db.news.add(newsItem);

    setSidebarState(false);
    event.currentTarget.reset();
  }

  function toggleCreateNews() {
    setSidebarState(!sidebarState);
  }

  return (
    <>
      <form
        aria-hidden={!sidebarState}
        onSubmit={createNews}
        className={`${styles.createNews} ${sidebarState && styles.createNews__open}`}
      >
        <div className={styles.createNews__inner}>
          <div className={styles.createNews__top}>
            <div className={styles.createNews__header}>Create news</div>
            <button className={styles.createNews__close} onClick={toggleCreateNews} type="button">
              <IoClose />
            </button>
          </div>
          <div className={styles.createNews__date}>
            <Dates date={createdDate} />
          </div>
          <div className={styles.createNews__created}>
            <Avatar avatar={currentUser.image} />
            <div className={styles.createNews__createdBy}>{currentUser?.username}</div>
          </div>
          <div className={styles.createNews__text}>
            <label htmlFor="news_field_title">Title</label>
            <input id="news_field_title" ref={titleRef} />
          </div>
          <div className={styles.createNews__body}>
            <label htmlFor="news_field_body">Text</label>
            <textarea id="news_field_body" ref={textRef} />
          </div>
          <div className={styles.createNews__text}>
            <label htmlFor="news_field_image">Image URL</label>
            <input id="news_field_image" ref={imageRef} />
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
