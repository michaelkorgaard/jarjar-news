import Dexie from "dexie";
import { NewsType } from "../../types/NewsType";
import { UserType } from "../../types/UserType";

class MyAppDatabase extends Dexie {
  news: Dexie.Table<NewsType, string>;
  users: Dexie.Table<UserType, number>;

  constructor() {
    super("Database");
    this.version(1).stores({
      news: "id, image, title, text, createdBy, createdImage, createdDate, likes, dislikes, hate, love",
      users: "++id, username, email, role, password",
    });
    this.news = this.table("news");
    this.users = this.table("users");
  }
}

const db = new MyAppDatabase();

export default db;
