import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { data, users } from "./assets/data/data.tsx";
import db from "./assets/data/db.ts";

// Contexts
import { NewsContext } from "./context/NewsContext.tsx";
import { SidebarContextProvider } from "./context/SidebarContext.tsx";
import { UserContext } from "./context/UserContext.tsx";

// Components
import { Header } from "./components/Header/Header";
import { NewsItem } from "./components/NewsItem/NewsItem";
import { NewsFeed } from "./components/NewsFeed/NewsFeed";
import { CreateNews } from "./components/CreateNews/CreateNews.tsx";
import { TopBar } from "./components/TopBar/TopBar.tsx";
import { UserType } from "./types/UserType.tsx";

export function App() {
  const [sidebarState, setSidebarState] = useState<boolean>(false);
  const [news, setNews] = useState(data);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [allUsers, setAllUsers] = useState<UserType[]>(users);

  useEffect(() => {
    db.news.bulkAdd(news);
    db.users.bulkAdd(users);
  }, []);
  return (
    <>
      <UserContext.Provider value={{ currentUser, allUsers, setCurrentUser, setAllUsers }}>
        <NewsContext.Provider value={{ news, setNews }}>
          <SidebarContextProvider value={{ sidebarState, setSidebarState }}>
            <CreateNews />
            <TopBar />
            <Header />
            <div className="wrapper">
              <Routes>
                <Route path="/" element={<NewsFeed />} />s
                <Route path="/news-item/:id" element={<NewsItem />} />
              </Routes>
            </div>
          </SidebarContextProvider>
        </NewsContext.Provider>
      </UserContext.Provider>
    </>
  );
}
