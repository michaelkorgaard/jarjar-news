import Dexie from "dexie";
import { NewsType } from "../../types/NewsType";
import { UserType } from "../../types/UserType";

class Database extends Dexie {
  news: Dexie.Table<NewsType, string>;
  users: Dexie.Table<UserType, number>;
  currentUser: Dexie.Table<UserType, string>;

  constructor() {
    super("Database");
    this.version(1).stores({
      news: "id, image, title, text, createdBy, createdImage, createdDate, likes, dislikes, hate, love",
      users: "++id, username, email, role, password, image",
      currentUser: "id, username, email, role, password, image",
    });
    this.news = this.table("news");
    this.users = this.table("users");
    this.currentUser = this.table("currentUser");
  }
}

const db = new Database();

export default db;
