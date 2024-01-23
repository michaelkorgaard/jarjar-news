import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { data } from "./assets/data/data.tsx";

// Contexts
import { NewsContext } from "./context/NewsContext.tsx";
import { SidebarContentProvider } from "./context/SidebarContext.tsx";

// Components
import Header from "./components/Header/Header";
import NewsItem from "./components/NewsItem/NewsItem";
import NewsFeed from "./components/NewsFeed/NewsFeed";
import { CreateNews } from "./components/CreateNews/CreateNews.tsx";

function App() {
  const [sidebarState, setSidebarState] = useState<boolean>(false);
  const [news, setNews] = useState(data);

  return (
    <>
      <NewsContext.Provider value={{ news, setNews }}>
        <SidebarContentProvider value={{ sidebarState, setSidebarState }}>
          <CreateNews />

          <Header />
          <div className="wrapper">
            <Routes>
              <Route path="/" element={<NewsFeed />} />
              <Route path="/news-item/:id" element={<NewsItem />} />
            </Routes>
          </div>
        </SidebarContentProvider>
      </NewsContext.Provider>
    </>
  );
}

export default App;
