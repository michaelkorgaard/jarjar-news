import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import NewsItem from "./components/NewsItem/NewsItem";
import NewsFeed from "./components/NewsFeed/NewsFeed";
import { useState } from "react";
import { CommentInterface, NewsInterface, news } from "./assets/data/data.tsx";
import { SidebarContext } from "./context/SidebarContext.tsx";

function App() {
  const [sidebarState, setSidebarState] = useState<boolean>(false);

  const [newsArray, setNewsArray] = useState(news);

  function createNewsItem(newsItem: NewsInterface) {
    const newNewsArray = [...newsArray, newsItem];
    setNewsArray(newNewsArray);
  }

  function deleteNewsItem(newsItemId: string) {
    const newNewsArray = newsArray.filter((elm) => elm.id !== newsItemId);
    setNewsArray(newNewsArray);
  }

  function onCreateComment(
    comment: CommentInterface,
    newsId: string | undefined
  ) {
    const index = newsArray.findIndex((elm) => elm.id === newsId);
    newsArray[index].comments?.push(comment);
    const newNewsArray = [...newsArray];
    setNewsArray(newNewsArray);
  }

  return (
    <>
      <SidebarContext.Provider value={{ sidebarState, setSidebarState }}>
        <Header />
        <div className="wrapper">
          <Routes>
            <Route
              path="/"
              element={
                <NewsFeed
                  newsArray={newsArray}
                  onCreateNewsItem={createNewsItem}
                  onDeleteNewsItem={deleteNewsItem}
                />
              }
            />
            <Route
              path="/news-item/:id"
              element={
                <NewsItem
                  newsArray={newsArray}
                  onCreateComment={onCreateComment}
                />
              }
            />
          </Routes>
        </div>
      </SidebarContext.Provider>
    </>
  );
}

export default App;
