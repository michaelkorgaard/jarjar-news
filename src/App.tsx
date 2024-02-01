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
    const seedDatabase = async () => {
      const existingNewsCount = await db.news.count();
      const existingUsersCount = await db.users.count();
      const existingCurrentUsersCount = await db.currentUser.count();

      if (existingNewsCount === 0 && existingUsersCount === 0 && existingCurrentUsersCount === 0) {
        db.news.bulkAdd(data);
        db.users.bulkAdd(users);
        if (currentUser !== null) {
          db.currentUser.put(currentUser);
        }
      } else {
        const existingNews = await db.news.toArray();
        const existingUsers = await db.users.toArray();
        const existingCurrentUser = await db.currentUser.toArray();
        setNews(existingNews);
        setAllUsers(existingUsers);
        setCurrentUser(existingCurrentUser[0]);
      }
    };

    seedDatabase();
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
