import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import NewsItem from "./components/NewsItem/NewsItem";
import NewsFeed from "./components/NewsFeed/NewsFeed";
import { useState } from "react";
import { data } from "./assets/data/data.tsx";
import { NewsContext } from "./context/NewsContext.tsx";
import { SidebarContext } from "./context/SidebarContext.tsx";
import { CommentType } from "./types/CommentType.tsx";

function App() {
  const [sidebarState, setSidebarState] = useState<boolean>(false);

  const [news, setNews] = useState(data);

  function onCreateComment(comment: CommentType, newsId: string | undefined) {
    const index = news.findIndex((elm) => elm.id === newsId);
    news[index].comments?.push(comment);
    const newNewsArray = [...news];
    setNews(newNewsArray);
  }

  return (
    <>
      <NewsContext.Provider value={{ news, setNews }}>
        <SidebarContext.Provider value={{ sidebarState, setSidebarState }}>
          <Header />
          <div className="wrapper">
            <Routes>
              <Route path="/" element={<NewsFeed />} />
              <Route
                path="/news-item/:id"
                element={<NewsItem onCreateComment={onCreateComment} />}
              />
            </Routes>
          </div>
        </SidebarContext.Provider>
      </NewsContext.Provider>
    </>
  );
}

export default App;
